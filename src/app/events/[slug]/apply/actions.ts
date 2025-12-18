'use server';

import { createClient } from '@/lib/supabase/server';

export async function submitApplication(eventId: string, formData: FormData) {
    const supabase = await createClient();

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { success: false, error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

    if (!profile) return { success: false, error: 'Profile not found' };

    const { data: fields } = await supabase
        .from('event_form_fields')
        .select('*')
        .eq('event_id', eventId)
        .order('display_order', { ascending: true });

    const responses = fields?.map(field => {
        return {
            field_id: field.id,
            response_value: formData.get(field.id)?.toString() || ''
        };
    }) || [];

    const { error } = await supabase.rpc('submit_application', {
        p_event_id: eventId,
        p_user_id: session.user.id,
        p_profile_snapshot: profile,
        p_responses: responses
    });

    if (error) {
        console.error('Submission error:', error);
        return { success: false, error: error.message };
    }

    return { success: true };
}
