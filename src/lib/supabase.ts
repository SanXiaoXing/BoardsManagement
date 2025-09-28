import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * 按需获取 Supabase 客户端，避免在模块顶层初始化时抛错导致整个 SSR 函数不可用。
 */
export function getSupabase(): SupabaseClient {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase 环境变量缺失', {
      supabaseUrl: supabaseUrl ? 'present' : 'missing',
      supabaseAnonKey: supabaseAnonKey ? 'present' : 'missing',
      vercel: process.env.VERCEL,
      vercelEnv: process.env.VERCEL_ENV,
      nodeEnv: process.env.NODE_ENV
    });
    throw new Error('缺少 PUBLIC_SUPABASE_URL 或 PUBLIC_SUPABASE_ANON_KEY 环境变量');
  }

  return createClient(supabaseUrl, supabaseAnonKey);
}