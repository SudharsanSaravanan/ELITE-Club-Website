-- RPC to handle transactional application submission
create or replace function submit_application(
    p_event_id uuid,
    p_user_id uuid,
    p_profile_snapshot jsonb,
    p_responses jsonb  -- Array of { field_id, response_value }
)
returns uuid
language plpgsql
security definer
as $$
declare
    v_registration_id uuid;
    v_response jsonb;
begin
    -- 1. Check if already registered
    if exists (select 1 from event_registrations where event_id = p_event_id and user_id = p_user_id) then
        raise exception 'User already registered for this event';
    end if;

    -- 2. Create Registration
    insert into event_registrations (event_id, user_id, profile_snapshot, status)
    values (p_event_id, p_user_id, p_profile_snapshot, 'pending')
    returning id into v_registration_id;

    -- 3. Insert Responses
    if p_responses is not null and jsonb_array_length(p_responses) > 0 then
        for v_response in select * from jsonb_array_elements(p_responses)
        loop
            insert into registration_responses (registration_id, field_id, response_value)
            values (v_registration_id, (v_response->>'field_id')::uuid, v_response->>'response_value');
        end loop;
    end if;

    return v_registration_id;
end;
$$;
