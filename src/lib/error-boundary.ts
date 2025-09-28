/**
 * 错误边界和超时处理工具
 * 用于 Serverless 环境下的稳定性保障
 */

export interface ErrorBoundaryOptions {
  timeout?: number; // 超时时间（毫秒）
  fallback?: any; // 失败时的默认值
}

/**
 * 带超时的 Promise 包装器
 */
export function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs: number = 10000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`操作超时 (${timeoutMs}ms)`));
    }, timeoutMs);

    promise
      .then((result) => {
        clearTimeout(timer);
        resolve(result);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

/**
 * 安全执行 Supabase 查询
 */
export async function safeQuery(
  queryFn: () => any,
  options: ErrorBoundaryOptions = {}
): Promise<{ data: any; error: Error | null }> {
  const { timeout = 8000, fallback = null } = options;
  
  try {
    const queryBuilder = queryFn();
    const result: any = await withTimeout(queryBuilder, timeout);
    
    if (result?.error) {
      const error = new Error(`查询失败: ${result.error.message || result.error}`);
      console.error('查询错误:', result.error);
      return { data: fallback, error };
    }
    
    return { data: result?.data || fallback, error: null };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error('查询异常:', err.message);
    return { data: fallback, error: err };
  }
}

/**
 * 检查是否为 Serverless 环境
 */
export function isServerlessEnvironment(): boolean {
  return !!(
    process.env.VERCEL ||
    process.env.AWS_LAMBDA_FUNCTION_NAME ||
    process.env.NETLIFY ||
    process.env.CF_PAGES
  );
}

/**
 * 获取适合当前环境的超时时间
 */
export function getEnvironmentTimeout(): number {
  if (isServerlessEnvironment()) {
    // Serverless 环境使用较短的超时时间
    return 6000; // 6秒
  }
  return 12000; // 本地开发环境 12秒
}