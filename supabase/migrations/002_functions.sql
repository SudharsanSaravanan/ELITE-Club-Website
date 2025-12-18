--parses roll number format: cb.sc.u4cse24111
create or replace function parse_roll_number(roll_no varchar)
returns jsonb as $$
declare
    result jsonb;
    parts text[];
    program_part varchar(10);
    dept_year_section varchar(20);
    program_code varchar(2);
    program_years integer;
    dept_code varchar(10);
    year_code varchar(2);
    section_digit char(1);
    section_letter char(1);
    roll_in_section varchar(5);
begin
    roll_no := lower(trim(roll_no));
    parts := string_to_array(roll_no, '.');
    
    if array_length(parts, 1) = 3 then
        dept_year_section := parts[3];
        
        if dept_year_section ~ '^[up][0-9]' then
            program_code := substring(dept_year_section from 1 for 1);
            program_years := substring(dept_year_section from 2 for 1)::integer;
            
            dept_code := upper(substring(dept_year_section from 3 for 
                length(dept_year_section) - 2 - 4));
            
            if dept_year_section ~ '^[up][0-9][a-z]+[0-9]{2}[0-9][0-9]+$' then
                dept_code := upper((regexp_match(dept_year_section, '^[up][0-9]([a-z]+)[0-9]+$'))[1]);
                declare
                    numeric_suffix varchar;
                begin
                    numeric_suffix := (regexp_match(dept_year_section, '^[up][0-9][a-z]+([0-9]+)$'))[1];
                    year_code := substring(numeric_suffix from 1 for 2);
                    section_digit := substring(numeric_suffix from 3 for 1);
                    roll_in_section := substring(numeric_suffix from 4);
                    
                    section_letter := chr(65 + section_digit::integer);
                    
                    result := jsonb_build_object(
                        'branch', upper(parts[1]),
                        'school', upper(parts[2]),
                        'admission_year', 2000 + year_code::integer,
                        'graduation_year', 2000 + year_code::integer + program_years,
                        'program', case when program_code = 'u' then 'UG' else 'PG' end,
                        'program_duration', program_years,
                        'department', dept_code,
                        'section', section_letter,
                        'section_roll', roll_in_section::integer
                    );
                end;
            end if;
        end if;
    end if;
    
    if result is null then
        result := null;
    end if;
    
    return result;
end;
$$ language plpgsql immutable;

--calculates current academic year from admission year
create or replace function calculate_current_year(admission_year integer, program program_type)
returns varchar as $$
declare
    current_academic_year integer;
    year_diff integer;
    max_years integer;
begin
    if extract(month from now()) >= 6 then
        current_academic_year := extract(year from now())::integer;
    else
        current_academic_year := extract(year from now())::integer - 1;
    end if;
    
    year_diff := current_academic_year - admission_year + 1;
    max_years := case when program = 'UG' then 4 else 2 end;
    
    if year_diff > max_years then
        return 'Alumni';
    elsif year_diff < 1 then
        return 'N/A';
    else
        return year_diff || case year_diff
            when 1 then 'st'
            when 2 then 'nd'
            when 3 then 'rd'
            else 'th'
        end || ' Year';
    end if;
end;
$$ language plpgsql stable;

--creates profile when user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
    insert into public.profiles (id, email, full_name, avatar_url)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'),
        new.raw_user_meta_data->>'avatar_url'
    );
    return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function handle_new_user();

--parses roll number when profile is updated
create or replace function update_profile_from_roll_number()
returns trigger as $$
declare
    parsed jsonb;
begin
    if new.roll_number is not null and (old.roll_number is null or new.roll_number != old.roll_number) then
        parsed := parse_roll_number(new.roll_number);
        
        if parsed is not null then
            new.branch := parsed->>'branch';
            new.school := parsed->>'school';
            new.admission_year := (parsed->>'admission_year')::integer;
            new.graduation_year := (parsed->>'graduation_year')::integer;
            new.program := (parsed->>'program')::program_type;
            new.program_duration := (parsed->>'program_duration')::integer;
            new.department := parsed->>'department';
            new.section := parsed->>'section';
            new.section_roll := (parsed->>'section_roll')::integer;
            new.current_year := calculate_current_year(new.admission_year, new.program);
        end if;
    end if;
    
    new.updated_at := now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists on_profile_roll_number_update on profiles;
create trigger on_profile_roll_number_update
    before update on profiles
    for each row execute function update_profile_from_roll_number();

--parses roll number when profile is inserted
create or replace function set_profile_from_roll_number()
returns trigger as $$
declare
    parsed jsonb;
begin
    if new.roll_number is not null then
        parsed := parse_roll_number(new.roll_number);
        
        if parsed is not null then
            new.branch := parsed->>'branch';
            new.school := parsed->>'school';
            new.admission_year := (parsed->>'admission_year')::integer;
            new.graduation_year := (parsed->>'graduation_year')::integer;
            new.program := (parsed->>'program')::program_type;
            new.program_duration := (parsed->>'program_duration')::integer;
            new.department := parsed->>'department';
            new.section := parsed->>'section';
            new.section_roll := (parsed->>'section_roll')::integer;
            new.current_year := calculate_current_year(new.admission_year, new.program);
        end if;
    end if;
    
    return new;
end;
$$ language plpgsql;

drop trigger if exists on_profile_insert on profiles;
create trigger on_profile_insert
    before insert on profiles
    for each row execute function set_profile_from_roll_number();

--updates timestamp on record change
create or replace function update_updated_at()
returns trigger as $$
begin
    new.updated_at := now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists on_events_update on events;
create trigger on_events_update
    before update on events
    for each row execute function update_updated_at();

--generates url-friendly slug from event title
create or replace function generate_event_slug()
returns trigger as $$
declare
    base_slug varchar;
    final_slug varchar;
    counter integer := 0;
begin
    if new.slug is null or new.slug = '' then
        base_slug := lower(regexp_replace(new.title, '[^a-zA-Z0-9]+', '-', 'g'));
        base_slug := trim(both '-' from base_slug);
        final_slug := base_slug;
        
        while exists (select 1 from events where slug = final_slug and id != new.id) loop
            counter := counter + 1;
            final_slug := base_slug || '-' || counter;
        end loop;
        
        new.slug := final_slug;
    end if;
    
    return new;
end;
$$ language plpgsql;

drop trigger if exists on_events_slug on events;
create trigger on_events_slug
    before insert on events
    for each row execute function generate_event_slug();
