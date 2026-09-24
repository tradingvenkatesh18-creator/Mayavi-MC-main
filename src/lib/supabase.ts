import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { CMSData } from './cmsStore';

const STORAGE_URL_KEY = 'mayavi_supabase_url';
const STORAGE_KEY_KEY = 'mayavi_supabase_anon_key';

export function getSupabaseConfig(): { url: string; anonKey: string; isConfigured: boolean; source: 'env' | 'storage' | 'none' } {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL?.trim() || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY?.trim() || '';

  if (envUrl && envKey) {
    return { url: envUrl, anonKey: envKey, isConfigured: true, source: 'env' };
  }

  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem(STORAGE_URL_KEY)?.trim() || '';
    const localKey = localStorage.getItem(STORAGE_KEY_KEY)?.trim() || '';
    if (localUrl && localKey) {
      return { url: localUrl, anonKey: localKey, isConfigured: true, source: 'storage' };
    }
  }

  return { url: '', anonKey: '', isConfigured: false, source: 'none' };
}

let cachedClient: SupabaseClient | null = null;
let lastClientKey = '';

export function getSupabaseClient(): SupabaseClient | null {
  const config = getSupabaseConfig();
  if (!config.isConfigured) return null;

  const currentKey = `${config.url}::${config.anonKey}`;
  if (cachedClient && lastClientKey === currentKey) {
    return cachedClient;
  }

  try {
    cachedClient = createClient(config.url, config.anonKey);
    lastClientKey = currentKey;
    return cachedClient;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
}

export function setCustomSupabaseConfig(url: string, anonKey: string): void {
  if (typeof window === 'undefined') return;
  const cleanUrl = url.trim();
  const cleanKey = anonKey.trim();

  if (cleanUrl && cleanKey) {
    localStorage.setItem(STORAGE_URL_KEY, cleanUrl);
    localStorage.setItem(STORAGE_KEY_KEY, cleanKey);
  } else {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }
  cachedClient = null;
  lastClientKey = '';
}

/**
 * Test connectivity with Supabase by checking or pinging the table
 */
export async function testSupabaseConnection(customUrl?: string, customKey?: string): Promise<{ success: boolean; message: string; tableReady?: boolean }> {
  let client: SupabaseClient | null = null;
  if (customUrl && customKey) {
    try {
      client = createClient(customUrl.trim(), customKey.trim());
    } catch (e: any) {
      return { success: false, message: `Invalid credentials: ${e.message}` };
    }
  } else {
    client = getSupabaseClient();
  }

  if (!client) {
    return { success: false, message: 'Supabase credentials are not configured yet.' };
  }

  try {
    const { data, error } = await client
      .from('mayavi_cms')
      .select('id, updated_at')
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.message.includes('relation "mayavi_cms" does not exist')) {
        return {
          success: true,
          tableReady: false,
          message: 'Connected to Supabase! The "mayavi_cms" table does not exist yet. Run the SQL schema script below in your Supabase SQL editor.'
        };
      }
      return { success: false, message: `Supabase Error: ${error.message} (Code: ${error.code})` };
    }

    return {
      success: true,
      tableReady: true,
      message: `Connected successfully! Found ${data ? data.length : 0} production records in mayavi_cms.`
    };
  } catch (err: any) {
    return { success: false, message: `Connection failed: ${err.message || 'Unknown network error'}` };
  }
}

/**
 * Fetch the latest production CMS payload from Supabase
 */
export async function fetchCMSFromSupabase(): Promise<CMSData | null> {
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from('mayavi_cms')
      .select('data, updated_at')
      .eq('id', 'production')
      .single();

    if (error || !data || !data.data) {
      return null;
    }

    return data.data as CMSData;
  } catch (err) {
    console.warn('Could not fetch from Supabase, using local fallback:', err);
    return null;
  }
}

/**
 * Push the complete CMS payload to Supabase cloud table
 */
export async function saveCMSToSupabase(cmsData: CMSData): Promise<{ success: boolean; message: string }> {
  const client = getSupabaseClient();
  if (!client) {
    return { success: false, message: 'Supabase is not configured yet. Changes saved locally in browser.' };
  }

  try {
    const payload = {
      id: 'production',
      data: cmsData,
      updated_at: new Date().toISOString()
    };

    const { error } = await client
      .from('mayavi_cms')
      .upsert(payload, { onConflict: 'id' });

    if (error) {
      console.error('Supabase Upsert Error:', error);
      return { success: false, message: `Failed to save to Supabase: ${error.message}` };
    }

    return { success: true, message: 'All CMS videos and content saved to Supabase cloud database!' };
  } catch (err: any) {
    console.error('Supabase Save Exception:', err);
    return { success: false, message: `Cloud sync error: ${err.message}` };
  }
}

/**
 * SQL Schema creation script for the user to paste into Supabase SQL editor
 */
export const SUPABASE_SQL_SCHEMA = `-- MAYAVI MEDIA CREATIONS: PRODUCTION CMS TABLE
CREATE TABLE IF NOT EXISTS public.mayavi_cms (
  id TEXT PRIMARY KEY,
  data JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.mayavi_cms ENABLE ROW LEVEL SECURITY;

-- Allow public reads so all visitors see latest videos
DROP POLICY IF EXISTS "Public Read Mayavi CMS" ON public.mayavi_cms;
CREATE POLICY "Public Read Mayavi CMS"
  ON public.mayavi_cms
  FOR SELECT
  USING (true);

-- Allow public upsert/write for the single-user admin CMS
DROP POLICY IF EXISTS "Allow Admin Write Mayavi CMS" ON public.mayavi_cms;
CREATE POLICY "Allow Admin Write Mayavi CMS"
  ON public.mayavi_cms
  FOR ALL
  USING (true)
  WITH CHECK (true);
`;
