import React, { useMemo } from 'react';
import { ConfigProvider, Pagination, theme } from 'antd';

/**
 * Ant Design 分页岛组件。
 *
 * 仅用于首页列表的分页展示与跳转，每页大小由 props.pageSize 控制（默认 10）。
 * 切换页码时会保留现有查询参数（vendor_id、category），并更新 page 参数。
 */
export default function PaginationIsland({ current, total, pageSize = 10 }: { current: number; total: number; pageSize?: number }) {
  // 深色主题（近似 Dracula）
  const cfg = useMemo(() => ({
    algorithm: theme.darkAlgorithm,
    token: {
      colorBgBase: '#303241',
      colorText: '#f8f8f2',
      colorPrimary: '#8be9fd',
      colorInfo: '#8be9fd',
      borderRadius: 8,
    },
  }), []);

  /**
   * 在切换页码时进行导航。
   * - 保留 vendor_id 与 category 参数。
   * - 更新 page 参数。
   * - 优先使用 View Transitions API，回退到淡出与遮罩。
   */
  const navigateToPage = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', String(page));
    // 保留其它查询参数（默认已保留）

    const go = () => (window.location.href = url.toString());

    // 在部分严格 TS 配置（未包含 DOM lib）环境下，直接使用 document 可能被推断为 never。
    // 因此这里使用 globalThis 并做安全的类型守卫，避免 linter 报错。
    const d: any = typeof globalThis !== 'undefined' && (globalThis as any).document ? (globalThis as any).document : null;

    if (d && typeof d.startViewTransition === 'function') {
      d.startViewTransition(() => go());
    } else {
      const overlay = d?.getElementById?.('loading-overlay');
      const app = d?.getElementById?.('app');
      if (overlay) overlay.removeAttribute('hidden');
      if (app) app.classList.add('leaving');
      setTimeout(go, 220);
    }
  };

  return (
    <ConfigProvider theme={cfg}>
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination
          current={current || 1}
          total={total || 0}
          pageSize={pageSize}
          showSizeChanger={false}
          onChange={(p) => navigateToPage(p)}
        />
      </div>
    </ConfigProvider>
  );
}