--enum types
create type program_type as enum ('UG', 'PG');
create type user_role as enum ('student', 'member', 'lead', 'admin');
create type event_type as enum ('workshop', 'hackathon', 'seminar', 'competition', 'meetup', 'other');
create type event_status as enum ('draft', 'published', 'ongoing', 'completed', 'cancelled');
create type form_field_type as enum ('text', 'textarea', 'email', 'phone', 'number', 'select', 'multi_select', 'radio', 'checkbox', 'date', 'time', 'file', 'url');
create type registration_status as enum ('pending', 'approved', 'rejected', 'waitlisted', 'cancelled', 'attended');

--profiles table (linked to auth.users, roll number format: cb.sc.u4cse24111)
create table profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    roll_number varchar(30) unique,
    email varchar(255) not null,
    full_name varchar(255),
    phone varchar(15),
    
    branch varchar(10),
    school varchar(10),
    department varchar(50),
    admission_year integer,
    graduation_year integer,
    current_year varchar(10),
    section varchar(5),
    section_roll integer,
    program program_type,
    program_duration integer,
    
    role user_role default 'student',
    is_club_member boolean default false,
    member_since timestamp with time zone,
    
    avatar_url text,
    linkedin_url text,
    github_url text,
    
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_profiles_department on profiles(department);
create index idx_profiles_role on profiles(role);
create index idx_profiles_is_member on profiles(is_club_member);
create index idx_profiles_branch on profiles(branch);
create index idx_profiles_school on profiles(school);

--events table
create table events (
    id uuid primary key default gen_random_uuid(),
    
    title varchar(255) not null,
    slug varchar(255) unique not null,
    description text,
    short_description varchar(500),
    
    event_type event_type default 'other',
    status event_status default 'draft',
    
    start_date timestamp with time zone not null,
    end_date timestamp with time zone,
    registration_deadline timestamp with time zone,
    
    venue varchar(255),
    venue_details text,
    is_online boolean default false,
    online_link text,
    
    max_participants integer,
    min_participants integer default 1,
    team_size_min integer default 1,
    team_size_max integer default 1,
    
    is_registration_open boolean default false,
    requires_approval boolean default false,
    
    banner_url text,
    thumbnail_url text,
    
    metadata jsonb default '{}',
    
    created_by uuid references profiles(id),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

create index idx_events_status on events(status);
create index idx_events_type on events(event_type);
create index idx_events_dates on events(start_date, end_date);
create index idx_events_slug on events(slug);

--dynamic form fields for events
create table event_form_fields (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references events(id) on delete cascade,
    
    field_name varchar(100) not null,
    field_label varchar(255) not null,
    field_type form_field_type not null,
    placeholder varchar(255),
    help_text text,
    
    is_required boolean default false,
    min_length integer,
    max_length integer,
    regex_pattern varchar(255),
    
    options jsonb,
    
    display_order integer default 0,
    is_visible boolean default true,
    
    auto_fill_from varchar(50),
    is_editable boolean default true,
    
    created_at timestamp with time zone default now(),
    
    unique(event_id, field_name)
);

create index idx_form_fields_event on event_form_fields(event_id);

--event registrations
create table event_registrations (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references events(id) on delete cascade,
    user_id uuid not null references profiles(id) on delete cascade,
    
    status registration_status default 'pending',
    
    profile_snapshot jsonb not null,
    
    team_id uuid,
    is_team_lead boolean default false,
    
    registered_at timestamp with time zone default now(),
    approved_at timestamp with time zone,
    approved_by uuid references profiles(id),
    
    checked_in_at timestamp with time zone,
    certificate_issued boolean default false,
    
    unique(event_id, user_id)
);

create index idx_registrations_event on event_registrations(event_id);
create index idx_registrations_user on event_registrations(user_id);
create index idx_registrations_status on event_registrations(status);

--form field responses
create table registration_responses (
    id uuid primary key default gen_random_uuid(),
    registration_id uuid not null references event_registrations(id) on delete cascade,
    field_id uuid not null references event_form_fields(id) on delete cascade,
    
    response_value text,
    response_json jsonb,
    
    created_at timestamp with time zone default now(),
    
    unique(registration_id, field_id)
);

create index idx_responses_registration on registration_responses(registration_id);

--teams for team events
create table teams (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references events(id) on delete cascade,
    team_name varchar(255) not null,
    team_code varchar(20) unique,
    lead_id uuid not null references profiles(id),
    created_at timestamp with time zone default now(),
    
    unique(event_id, team_name)
);

create index idx_teams_event on teams(event_id);

alter table event_registrations 
    add constraint fk_registration_team 
    foreign key (team_id) references teams(id) on delete set null;

--event announcements
create table event_announcements (
    id uuid primary key default gen_random_uuid(),
    event_id uuid not null references events(id) on delete cascade,
    title varchar(255) not null,
    content text not null,
    is_pinned boolean default false,
    created_by uuid references profiles(id),
    created_at timestamp with time zone default now()
);

create index idx_announcements_event on event_announcements(event_id);
