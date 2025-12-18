'use server';

import { createClient } from '@/lib/supabase/server';

export async function promoteUserAction(formData: FormData) {
    const supabase = await createClient();
    const email = formData.get('email') as string;

    if (!email) return { error: 'Email is required' };

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return { error: 'Unauthorized' };

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Only Admins could promote users.' };
    }

    const { error } = await supabase.rpc('promote_to_admin', { p_email: email });

    if (error) {
        console.error('Promote Error:', error);
        return { error: error.message };
    }

    return { success: true };
}
