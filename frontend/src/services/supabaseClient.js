import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://xwaaptqgbmsvwtrpsdtc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh3YWFwdHFnYm1zdnd0cnBzZHRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwMTE5MjcsImV4cCI6MjA5ODU4NzkyN30.rms-kPlqTG4Qhk_is-s2KmD40Ut2FoCwQSIuq6m1Y7Q';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
