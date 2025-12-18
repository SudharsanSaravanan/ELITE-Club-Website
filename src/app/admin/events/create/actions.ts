'use server';

import { createClient } from '@/lib/supabase/server';
import { FormFieldConfig } from '@/components/admin/EventFormBuilder';

export async function createEventAction(formData: FormData, formFields: FormFieldConfig[]) {
    const supabase = await createClient();

    const eventData = {
        title: formData.get('title'),
        description: formData.get('description'),
        short_description: formData.get('short_description'),
        event_type: formData.get('event_type'),
        status: formData.get('status'),
        start_date: formData.get('start_date'),
        end_date: formData.get('end_date'),
        registration_deadline: formData.get('end_date'),
        venue: formData.get('is_online') === 'on' ? 'Online' : 'TBD',
        is_online: formData.get('is_online') === 'on',
        max_participants: 100,
        min_participants: 1,
        team_size_min: 1,
        team_size_max: 1,
        is_registration_open: formData.get('is_registration_open') === 'on',
        requires_approval: true,
        banner_url: formData.get('banner_url') || null
    };

    const cleanFields = formFields.map(f => ({
        field_name: f.field_name,
        field_label: f.field_label,
        field_type: f.field_type,
        is_required: f.is_required,
        options: f.options,
        placeholder: f.placeholder,
        display_order: f.display_order,
        auto_fill_from: f.auto_fill_from || null,
        is_editable: f.is_editable ?? true
    }));

    const { error } = await supabase.rpc('create_event_with_form', {
        p_event_data: eventData,
        p_form_fields: cleanFields
    });

    if (error) {
        console.error('Create Event Error:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
