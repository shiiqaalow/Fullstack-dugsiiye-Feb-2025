import { createClient } from "@supabase/supabase-js";
import { ConstructionIcon } from "lucide-react";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_KEY
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY


export const supabase = createClient(supabaseUrl, supabaseAnon, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
    },
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }

})