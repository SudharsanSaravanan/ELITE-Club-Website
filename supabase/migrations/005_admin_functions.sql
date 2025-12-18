-- 005_admin_functions.sql

-- RPC to create an event and its form fields transactionally
create or replace function create_event_with_form(
    p_event_data jsonb,
    p_form_fields jsonb
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_event_id uuid;
    v_field jsonb;
begin
    -- 1. Check if user is admin/lead
    if not is_admin_or_lead() then
        raise exception 'Unauthorized';
    end if;

    -- 2. Insert Event
    insert into events (
        title,
        slug,
        description,
        short_description,
        event_type,
        status,
        start_date,
        end_date,
        registration_deadline,
        venue,
        venue_details,
        is_online,
        online_link,
        max_participants,
        min_participants,
        team_size_min,
        team_size_max,
        is_registration_open,
        requires_approval,
        banner_url,
        created_by
    )
    values (
        p_event_data->>'title',
        p_event_data->>'slug', -- Can be null, trigger will handle
        p_event_data->>'description',
        p_event_data->>'short_description',
        (p_event_data->>'event_type')::event_type,
        (p_event_data->>'status')::event_status,
        (p_event_data->>'start_date')::timestamptz,
        (p_event_data->>'end_date')::timestamptz,
        (p_event_data->>'registration_deadline')::timestamptz,
        p_event_data->>'venue',
        p_event_data->>'venue_details',
        (p_event_data->>'is_online')::boolean,
        p_event_data->>'online_link',
        (p_event_data->>'max_participants')::integer,
        (p_event_data->>'min_participants')::integer,
        (p_event_data->>'team_size_min')::integer,
        (p_event_data->>'team_size_max')::integer,
        (p_event_data->>'is_registration_open')::boolean,
        (p_event_data->>'requires_approval')::boolean,
        p_event_data->>'banner_url',
        auth.uid()
    )
    returning id into v_event_id;

    -- 3. Insert Form Fields
    if p_form_fields is not null and jsonb_array_length(p_form_fields) > 0 then
        for v_field in select * from jsonb_array_elements(p_form_fields)
        loop
            insert into event_form_fields (
                event_id,
                field_name,
                field_label,
                field_type,
                is_required,
                placeholder,
                options,
                display_order,
                auto_fill_from,
                is_editable
            )
            values (
                v_event_id,
                v_field->>'field_name',
                v_field->>'field_label',
                (v_field->>'field_type')::form_field_type,
                (v_field->>'is_required')::boolean,
                v_field->>'placeholder',
                v_field->'options',
                (v_field->>'display_order')::integer,
                v_field->>'auto_fill_from',
                COALESCE((v_field->>'is_editable')::boolean, true)
            );
        end loop;
    end if;

    return v_event_id;
end;
$$;

-- RPC to promote a user to admin by email
create or replace function promote_to_admin(p_email text)
returns boolean
language plpgsql
security definer
as $$
begin
    -- 1. Check if caller is admin (NOT lead)
    if not exists (select 1 from profiles where id = auth.uid() and role = 'admin') then
         raise exception 'Only Admins can promote users';
    end if;

    -- 2. Update role
    update profiles
    set role = 'admin'
    where email ilike p_email;

    if not found then
        return false;
    end if;

    return true;
end;
$$;
