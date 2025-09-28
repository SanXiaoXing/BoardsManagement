/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, n as renderScript, r as renderTemplate, o as Fragment } from '../chunks/astro/server_3dssWMWE.mjs';
import 'kleur/colors';
import { createClient } from '@supabase/supabase-js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { theme, ConfigProvider, Space, Select, Button } from 'antd';
export { renderers } from '../renderers.mjs';

function getSupabase() {
  const supabaseUrl = "https://xmklznarblbqwckqofiq.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhta2x6bmFyYmxicXdja3FvZmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA5ODEsImV4cCI6MjA3NDQyNjk4MX0.y6ShASdN7AF7CM-G7OSuMeSMYkdDwchPkfPimnPZv1w";
  return createClient(supabaseUrl, supabaseAnonKey);
}

class SimpleCache {
  cache = /* @__PURE__ */ new Map();
  set(key, data, ttl = 5 * 60 * 1e3) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }
    return item.data;
  }
  clear() {
    this.cache.clear();
  }
  // 生成缓存键
  generateKey(prefix, params) {
    const sortedParams = Object.keys(params).sort().map((key) => `${key}=${params[key]}`).join("&");
    return `${prefix}:${sortedParams}`;
  }
}
const cache = new SimpleCache();

function FilterBar(props) {
  const [vendorId, setVendorId] = useState(props.initialVendorId);
  const [category, setCategory] = useState(props.initialCategory || void 0);
  const cfg = useMemo(() => ({
    algorithm: theme.darkAlgorithm,
    token: {
      colorBgBase: "#303241",
      colorText: "#f8f8f2",
      colorPrimary: "#8be9fd",
      // 使用青色作为主色调，更和谐
      colorPrimaryHover: "#7dd3fc",
      // 悬停时稍微深一点
      colorPrimaryActive: "#67e8f9",
      // 激活时的颜色
      colorInfo: "#8be9fd",
      borderRadius: 8,
      colorTextPlaceholder: "#bdc1c6",
      colorBorder: "#3b3f52"
    }
  }), []);
  const onApply = () => {
    const params = new URLSearchParams();
    if (vendorId) params.set("vendor_id", String(vendorId));
    if (category) params.set("category", String(category));
    const url = "/" + (params.toString() ? "?" + params.toString() : "");
    const overlay = document.getElementById("loading-overlay");
    const app = document.getElementById("app");
    if (overlay) overlay.removeAttribute("hidden");
    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => {
        window.location.href = url;
      });
      return;
    }
    if (app) app.classList.add("leaving");
    setTimeout(() => window.location.href = url, 140);
  };
  const onReset = () => {
    const overlay = document.getElementById("loading-overlay");
    if (overlay) overlay.removeAttribute("hidden");
    window.location.href = "/";
  };
  return /* @__PURE__ */ jsx(ConfigProvider, { theme: cfg, children: /* @__PURE__ */ jsxs(Space, { size: 12, wrap: true, className: "toolbar", children: [
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("label", { children: "公司" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          allowClear: true,
          placeholder: "全部公司",
          style: { minWidth: 220 },
          options: props.vendorList.map((v) => ({ label: v.name, value: v.id })),
          value: vendorId,
          onChange: (val) => setVendorId(val)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "field", children: [
      /* @__PURE__ */ jsx("label", { children: "类型" }),
      /* @__PURE__ */ jsx(
        Select,
        {
          allowClear: true,
          placeholder: "全部类型",
          style: { minWidth: 220 },
          options: props.categories.map((c) => ({ label: c, value: c })),
          value: category,
          onChange: (val) => setCategory(val)
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Space, { children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "primary",
          onClick: onApply,
          className: "filter-button",
          style: {
            background: "linear-gradient(135deg, #6b9dc8 0%, #5a8bb5 100%)",
            border: "none",
            boxShadow: "0 4px 12px rgba(107, 157, 200, 0.2)",
            fontWeight: 600,
            color: "#ffffff",
            transition: "all 0.3s ease"
          },
          children: "筛选"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          type: "text",
          onClick: onReset,
          style: {
            color: "#bd93f9",
            fontWeight: 500
          },
          children: "重置"
        }
      )
    ] })
  ] }) });
}

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  let supabase = null;
  let supInitError = null;
  try {
    supabase = getSupabase();
  } catch (e) {
    supInitError = e;
  }
  const vendorIdParam = Astro2.url.searchParams.get("vendor_id");
  const categoryParam = Astro2.url.searchParams.get("category");
  const pageParam = Astro2.url.searchParams.get("page");
  const vendorIdRaw = vendorIdParam ? Number(vendorIdParam) : void 0;
  const vendorId = typeof vendorIdRaw === "number" && Number.isFinite(vendorIdRaw) ? vendorIdRaw : void 0;
  const category = categoryParam ? String(categoryParam) : "";
  const page = pageParam ? Math.max(1, Number(pageParam)) : 1;
  const pageSize = 10;
  const fmtDate = (v) => {
    const d = v ? new Date(v) : null;
    return d && !isNaN(d.getTime()) ? d.toLocaleString() : "-";
  };
  let vendorList = cache.get("vendors");
  if (!vendorList && supabase) {
    const { data } = await supabase.from("vendors").select("id, name").order("name");
    vendorList = data || [];
    cache.set("vendors", vendorList, 10 * 60 * 1e3);
  } else if (!vendorList) {
    vendorList = [];
  }
  let categories = cache.get("categories");
  if (!categories && supabase) {
    const { data: categoryRows } = await supabase.from("boards").select("category");
    categories = categoryRows ? [...new Set(categoryRows.map((item) => item.category))].filter(Boolean).sort() : [];
    cache.set("categories", categories, 10 * 60 * 1e3);
  } else if (!categories) {
    categories = [];
  }
  const baseFilter = {
    ...vendorId !== void 0 ? { vendor_id: vendorId } : {},
    ...category ? { category } : {}
  };
  const [boardsResult, totalCountResult] = await Promise.all([
    // 获取当前页数据 - 简化查询，只获取必要字段
    supabase ? supabase.from("boards").select(
      `id, model, category, board_website, created_at, updated_at, vendor_id, vendors!inner ( id, name, website ), drivers ( id, os, duplex_mode, version, driver_url )`
    ).match(baseFilter).order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1) : { data: [], error: supInitError },
    // 获取总数 - 使用更高效的计数查询
    supabase ? supabase.from("boards").select("id", { count: "exact", head: true }).match(baseFilter) : { count: 0 }
  ]);
  const { data: boards, error } = boardsResult;
  const { count: totalCount } = totalCountResult;
  if (error) {
    console.error("\u52A0\u8F7D boards \u5931\u8D25:", error?.message || error);
  }
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>板卡列表</title><!-- 样式通过模块导入，避免生产环境下 /src 路径不可用的问题 --><!-- 已移除 <link rel="stylesheet" href="/src/styles/global.css" /> -->${renderHead()}</head> <body class="dracula"> ${supInitError && renderTemplate`<div class="text-danger" style="padding: 12px; background: rgba(255,0,0,0.08); border: 1px solid rgba(255,0,0,0.3); margin: 12px; border-radius: 8px;">
系统暂时不可用：${supInitError.message}。请稍后重试或联系管理员。
</div>`} <div id="app"> <header class="site-header"> <div class="container flex"> <h1 class="title">板卡管理</h1> </div> </header> <main class="container"> <section class="mb-16"> ${renderComponent($$result, "FilterBar", FilterBar, { "client:load": true, "vendorList": vendorList || [], "categories": categories, "initialVendorId": vendorId, "initialCategory": category, "client:component-hydration": "load", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/FilterBar", "client:component-export": "default" })} </section> ${error && renderTemplate`<p class="text-danger">加载失败：${error.message}</p>`} ${!boards || boards.length === 0 ? renderTemplate`<p>暂无数据，请前往 管理员入口 添加，或更换筛选条件。</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <table> <thead> <tr> <th>公司</th> <th>型号</th> <th>类型</th> <th>驱动</th> <th>官网</th> <th>创建时间</th> </tr> </thead> <tbody> ${boards?.map((b) => renderTemplate`<tr> <td> ${b.vendors?.name ? b.vendors?.website ? renderTemplate`<a${addAttribute(b.vendors.website, "href")} target="_blank" rel="noreferrer"> ${b.vendors.name} </a>` : b.vendors.name : "-"} </td> <td> ${b.model} </td> <td> ${b.category || "-"} </td> <td> ${Array.isArray(b.drivers) && b.drivers.length > 0 ? renderTemplate`<ul class="list-drivers"> ${b.drivers.map((d) => renderTemplate`<li> <a${addAttribute(d.driver_url, "href")} target="_blank" rel="noreferrer"> ${d.os}${d.version ? ` \xB7 ${d.version}` : ""}${d.duplex_mode ? ` \xB7 ${d.duplex_mode}` : ""} </a> </li>`)} </ul>` : "-"} </td> <td> ${b.board_website ? renderTemplate`<a${addAttribute(b.board_website, "href")} target="_blank" rel="noreferrer">
查看
</a>` : "-"} </td> <td> ${fmtDate(b.created_at)} </td> </tr>`)} </tbody> </table> <section class="mt-16"> ${renderComponent($$result2, "PaginationIsland", null, { "client:only": "react", "current": page, "total": totalCount || 0, "pageSize": pageSize, "client:component-hydration": "only", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/PaginationIsland", "client:component-export": "default" })} </section> ` })}`} </main> ${renderComponent($$result, "Footer", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/Footer", "client:component-export": "default" })} </div> <div id="loading-overlay" hidden> <div class="spinner" aria-label="正在加载"></div> </div> ${renderScript($$result, "/Volumes/SanXiaoXing/Work/Boards/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "/Volumes/SanXiaoXing/Work/Boards/src/pages/index.astro", void 0);

const $$file = "/Volumes/SanXiaoXing/Work/Boards/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
