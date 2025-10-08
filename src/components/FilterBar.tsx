import React, { useMemo, useState, type JSX } from 'react';
import { ConfigProvider, theme, Select, Button, Space } from 'antd';

/**
 * 使用 Ant Design 的筛选栏组件
 *
 * Props
 * - vendorList: 公司列表（下拉）
 * - categories: 类型列表（下拉）
 * - initialVendorId: 初始选中的公司 ID
 * - initialCategory: 初始选中的类型
 */
export default function FilterBar(props: {
  vendorList: Array<{ id: number; name: string }>;
  categories: Array<{ id: number; name: string }>;
  initialVendorId?: number;
  initialCategory?: number;
}): JSX.Element {
  // 本地状态：公司与类型选择
  const [vendorId, setVendorId] = useState<number | undefined>(props.initialVendorId);
  const [categoryId, setCategoryId] = useState<number | undefined>(props.initialCategory || undefined);

  // Ant Design 主题配置（接近 Dracula 配色）
  const cfg = useMemo(() => ({
    algorithm: theme.darkAlgorithm,
    token: {
      colorBgBase: '#303241',
      colorText: '#f8f8f2',
      colorPrimary: '#8be9fd', // 使用青色作为主色调，更和谐
      colorPrimaryHover: '#7dd3fc', // 悬停时稍微深一点
      colorPrimaryActive: '#67e8f9', // 激活时的颜色
      colorInfo: '#8be9fd',
      borderRadius: 8,
      colorTextPlaceholder: '#bdc1c6',
      colorBorder: '#3b3f52',
    },
  }), []);

  /**
   * 处理筛选动作：根据选择生成查询参数并触发跳转
   * - 使用 View Transitions API（若可用）
   * - 否则显示离场动画与加载遮罩
   */
  const onApply = () => {
    const params = new URLSearchParams();
    if (vendorId) params.set('vendor_id', String(vendorId));
    if (categoryId) params.set('category', String(categoryId));
    const url = '/' + (params.toString() ? ('?' + params.toString()) : '');

    const overlay = document.getElementById('loading-overlay');
    const app = document.getElementById('app');
    if (overlay) overlay.removeAttribute('hidden');

    if (typeof document.startViewTransition === 'function') {
      document.startViewTransition(() => {
        window.location.href = url;
      });
      return;
    }

    if (app) app.classList.add('leaving');
    setTimeout(() => window.location.href = url, 140);
  };

  /**
   * 重置筛选并返回首页
   */
  const onReset = () => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) overlay.removeAttribute('hidden');
    window.location.href = '/';
  };

  return (
    <ConfigProvider theme={cfg}>
      <Space size={12} wrap className="toolbar">
        {/* 公司选择 */}
        <div className="field">
          <label>公司</label>
          <Select
            allowClear
            placeholder="全部公司"
            style={{ minWidth: 220 }}
            options={props.vendorList.map(v => ({ label: v.name, value: v.id }))}
            value={vendorId}
            onChange={(val) => setVendorId(val)}
          />
        </div>

        {/* 类型选择 */}
        <div className="field">
          <label>类型</label>
          <Select
            allowClear
            placeholder="全部类型"
            style={{ minWidth: 220 }}
            options={props.categories.map(c => ({ label: c.name, value: c.id }))}
            value={categoryId}
            onChange={(val) => setCategoryId(val)}
          />
        </div>

        <Space>
          <Button 
            type="primary" 
            onClick={onApply}
            className="filter-button"
            style={{
              background: 'linear-gradient(135deg, #6b9dc8 0%, #5a8bb5 100%)',
              border: 'none',
              boxShadow: '0 4px 12px rgba(107, 157, 200, 0.2)',
              fontWeight: 600,
              color: '#ffffff',
              transition: 'all 0.3s ease',
            }}
          >
            筛选
          </Button>
          <Button 
            type="text" 
            onClick={onReset}
            style={{
              color: '#bd93f9',
              fontWeight: 500,
            }}
          >
            重置
          </Button>
        </Space>
      </Space>
    </ConfigProvider>
  );
}