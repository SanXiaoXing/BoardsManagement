// 简单的内存缓存，用于提升查询性能
// 在 Serverless 环境中禁用缓存以避免潜在问题
interface CacheItem<T> {
  data: T;
  timestamp: number;
  ttl: number; // 生存时间（毫秒）
}

class SimpleCache {
  private cache = new Map<string, CacheItem<any>>();
  private isServerless = typeof process !== 'undefined' && (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME);

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void { // 默认5分钟
    // 在 Serverless 环境中禁用缓存
    if (this.isServerless) return;
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    // 在 Serverless 环境中禁用缓存
    if (this.isServerless) return null;
    
    const item = this.cache.get(key);
    if (!item) return null;

    // 检查是否过期
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  clear(): void {
    this.cache.clear();
  }

  // 生成缓存键
  generateKey(prefix: string, params: Record<string, any>): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}=${params[key]}`)
      .join('&');
    return `${prefix}:${sortedParams}`;
  }
}

export const cache = new SimpleCache();