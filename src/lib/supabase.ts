import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * 按需获取 Supabase 客户端，避免在模块顶层初始化时抛错导致整个 SSR 函数不可用。
 */
export function getSupabase(): SupabaseClient {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY;

  // 详细的环境信息
  const envInfo = {
    supabaseUrl: supabaseUrl ? 'present' : 'missing',
    supabaseAnonKey: supabaseAnonKey ? 'present' : 'missing',
    vercel: process.env.VERCEL || 'false',
    vercelEnv: process.env.VERCEL_ENV || 'local',
    nodeEnv: process.env.NODE_ENV || 'development',
    isServerless: !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME),
    availableEnvVars: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
  };

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('🚨 Supabase 环境变量配置错误', envInfo);
    
    // 根据环境提供具体的解决建议
    if (process.env.VERCEL) {
      console.error('💡 Vercel 部署环境变量配置指南：');
      console.error('1. 访问 Vercel Dashboard → Settings → Environment Variables');
      console.error('2. 添加 PUBLIC_SUPABASE_URL 和 PUBLIC_SUPABASE_ANON_KEY');
      console.error('3. 确保选择了 Production, Preview, Development 环境');
      console.error('4. 重新部署项目');
      console.error('📖 详细指南请查看项目根目录的 VERCEL_ENV_SETUP.md');
    } else {
      console.error('💡 本地开发环境解决方案：');
      console.error('1. 检查项目根目录是否有 .env 文件');
      console.error('2. 确保 .env 文件包含 PUBLIC_SUPABASE_URL 和 PUBLIC_SUPABASE_ANON_KEY');
    }
    
    throw new Error(`Supabase 环境变量配置错误: ${!supabaseUrl ? 'PUBLIC_SUPABASE_URL' : ''} ${!supabaseAnonKey ? 'PUBLIC_SUPABASE_ANON_KEY' : ''} 缺失`);
  }

  // 验证 URL 格式
  try {
    new URL(supabaseUrl);
  } catch (e) {
    console.error('🚨 Supabase URL 格式无效:', supabaseUrl);
    throw new Error('PUBLIC_SUPABASE_URL 格式无效，应该是完整的 HTTPS URL');
  }

  // 验证 API Key 格式（JWT token）
  if (!supabaseAnonKey.startsWith('eyJ')) {
    console.error('🚨 Supabase API Key 格式无效');
    throw new Error('PUBLIC_SUPABASE_ANON_KEY 格式无效，应该是 JWT token');
  }

  console.log('✅ Supabase 配置验证通过', {
    url: supabaseUrl.substring(0, 30) + '...',
    keyPrefix: supabaseAnonKey.substring(0, 10) + '...',
    environment: envInfo.vercelEnv
  });

  return createClient(supabaseUrl, supabaseAnonKey);
}