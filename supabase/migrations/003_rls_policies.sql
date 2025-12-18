--enable row level security
alter table profiles enable row level security;
alter table events enable row level security;
alter table event_form_fields enable row level security;
alter table event_registrations enable row level security;
alter table registration_responses enable row level security;
alter table teams enable row level security;
alter table event_announcements enable row level security;

--helper to check admin or lead role
create or replace function is_admin_or_lead()
returns boolean as $$
begin
    return exists (
        select 1 from profiles 
        where id = auth.uid() and role in ('admin', 'lead')
    );
end;
$$ language plpgsql security definer;

--profiles policies
create policy "profiles are viewable by everyone"
    on profiles for select
    using (true);

create policy "users can update own profile"
    on profiles for update
    using (auth.uid() = id)
    with check (auth.uid() = id);

create policy "users can insert own profile"
    on profiles for insert
    with check (auth.uid() = id);

create policy "admins can update any profile"
    on profiles for update
    using (is_admin_or_lead());

--events policies
create policy "published events are viewable by everyone"
    on events for select
    using (status != 'draft' or created_by = auth.uid() or is_admin_or_lead());

create policy "admins can insert events"
    on events for insert
    with check (is_admin_or_lead());

create policy "admins can update events"
    on events for update
    using (is_admin_or_lead());

create policy "admins can delete events"
    on events for delete
    using (is_admin_or_lead());

--form fields policies
create policy "form fields are viewable by everyone"
    on event_form_fields for select
    using (true);

create policy "admins can manage form fields"
    on event_form_fields for all
    using (is_admin_or_lead());

--registrations policies
create policy "users can view own registrations"
    on event_registrations for select
    using (user_id = auth.uid() or is_admin_or_lead());

create policy "users can register for open events"
    on event_registrations for insert
    with check (
        auth.uid() = user_id 
        and exists (
            select 1 from events 
            where id = event_id 
            and is_registration_open = true
            and status = 'published'
        )
    );

create policy "users can update own registration"
    on event_registrations for update
    using (user_id = auth.uid() or is_admin_or_lead());

create policy "users can cancel pending registration"
    on event_registrations for delete
    using (user_id = auth.uid() and status = 'pending');

--responses policies
create policy "users can view own responses"
    on registration_responses for select
    using (
        exists (
            select 1 from event_registrations 
            where id = registration_id 
            and (user_id = auth.uid() or is_admin_or_lead())
        )
    );

create policy "users can insert own responses"
    on registration_responses for insert
    with check (
        exists (
            select 1 from event_registrations 
            where id = registration_id 
            and user_id = auth.uid()
        )
    );

create policy "users can update own responses"
    on registration_responses for update
    using (
        exists (
            select 1 from event_registrations 
            where id = registration_id 
            and user_id = auth.uid()
        )
    );

--teams policies
create policy "teams are viewable by everyone"
    on teams for select
    using (true);

create policy "users can create teams"
    on teams for insert
    with check (lead_id = auth.uid());

create policy "team leads can update their team"
    on teams for update
    using (lead_id = auth.uid() or is_admin_or_lead());

create policy "team leads can delete their team"
    on teams for delete
    using (lead_id = auth.uid() or is_admin_or_lead());

--announcements policies
create policy "announcements are viewable by everyone"
    on event_announcements for select
    using (true);

create policy "admins can manage announcements"
    on event_announcements for all
    using (is_admin_or_lead());
