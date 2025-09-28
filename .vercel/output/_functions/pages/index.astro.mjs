/* empty css                                 */
import { e as createComponent, f as createAstro, h as addAttribute, k as renderHead, l as renderComponent, n as renderScript, r as renderTemplate, o as Fragment } from '../chunks/astro/server_3dssWMWE.mjs';
import 'kleur/colors';
import { createClient } from '@supabase/supabase-js';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { theme, ConfigProvider, Space, Select, Button } from 'antd';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function getSupabase() {
  const supabaseUrl = "https://xmklznarblbqwckqofiq.supabase.co";
  const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhta2x6bmFyYmxicXdja3FvZmlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4NTA5ODEsImV4cCI6MjA3NDQyNjk4MX0.y6ShASdN7AF7CM-G7OSuMeSMYkdDwchPkfPimnPZv1w";
  return createClient(supabaseUrl, supabaseAnonKey);
}

function withTimeout(promise, timeoutMs = 1e4) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`操作超时 (${timeoutMs}ms)`));
    }, timeoutMs);
    promise.then((result) => {
      clearTimeout(timer);
      resolve(result);
    }).catch((error) => {
      clearTimeout(timer);
      reject(error);
    });
  });
}
async function safeQuery(queryFn, options = {}) {
  const { timeout = 8e3, fallback = null } = options;
  try {
    const queryBuilder = queryFn();
    const result = await withTimeout(queryBuilder, timeout);
    if (result?.error) {
      const error = new Error(`查询失败: ${result.error.message || result.error}`);
      console.error("查询错误:", result.error);
      return { data: fallback, error };
    }
    return { data: result?.data || fallback, error: null };
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("查询异常:", err.message);
    return { data: fallback, error: err };
  }
}
function isServerlessEnvironment() {
  return !!(process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME || process.env.NETLIFY || process.env.CF_PAGES);
}
function getEnvironmentTimeout() {
  if (isServerlessEnvironment()) {
    return 6e3;
  }
  return 12e3;
}

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
    console.error("Supabase \u521D\u59CB\u5316\u5931\u8D25:", e);
    supInitError = e;
  }
  const queryTimeout = getEnvironmentTimeout();
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
  let vendorList = [];
  let categories = [];
  let boards = [];
  let totalCount = 0;
  let error = null;
  if (supabase && !supInitError) {
    const vendorResult = await safeQuery(
      () => supabase.from("vendors").select("id, name").order("name"),
      { timeout: queryTimeout, fallback: [] }
    );
    if (vendorResult.error) {
      console.error("\u83B7\u53D6\u4F9B\u5E94\u5546\u5217\u8868\u5931\u8D25:", vendorResult.error.message);
    }
    vendorList = vendorResult.data || [];
    const categoryResult = await safeQuery(
      () => supabase.from("boards").select("category"),
      { timeout: queryTimeout, fallback: [] }
    );
    if (categoryResult.error) {
      console.error("\u83B7\u53D6\u7C7B\u522B\u5217\u8868\u5931\u8D25:", categoryResult.error.message);
    } else {
      const categoryData = categoryResult.data || [];
      categories = [...new Set(categoryData.map((item) => item.category))].filter(Boolean).sort();
    }
    const baseFilter = {
      ...vendorId !== void 0 ? { vendor_id: vendorId } : {},
      ...category ? { category } : {}
    };
    const boardResult = await safeQuery(
      () => supabase.from("boards").select(`
        id, model, category, board_website, created_at, updated_at, vendor_id,
        vendors!inner ( id, name, website ),
        drivers ( id, os, duplex_mode, version, driver_url )
      `).match(baseFilter).order("created_at", { ascending: false }).range((page - 1) * pageSize, page * pageSize - 1),
      { timeout: queryTimeout, fallback: [] }
    );
    if (boardResult.error) {
      console.error("\u83B7\u53D6\u677F\u5361\u6570\u636E\u5931\u8D25:", boardResult.error.message);
      error = boardResult.error;
    }
    boards = boardResult.data || [];
    const countResult = await safeQuery(
      () => supabase.from("boards").select("id", { count: "exact", head: true }).match(baseFilter),
      { timeout: queryTimeout, fallback: { count: 0 } }
    );
    if (countResult.error) {
      console.error("\u83B7\u53D6\u603B\u6570\u5931\u8D25:", countResult.error.message);
    } else {
      totalCount = countResult.data?.count || 0;
    }
  } else {
    error = supInitError;
  }
  return renderTemplate`<html lang="zh-CN"> <head><meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>板卡列表</title>${renderHead()}</head> <body class="dracula"> ${supInitError && renderTemplate`<div class="text-danger" style="padding: 12px; background: rgba(255,0,0,0.08); border: 1px solid rgba(255,0,0,0.3); margin: 12px; border-radius: 8px;">
系统暂时不可用：${supInitError.message}。请稍后重试或联系管理员。
<br> <small><a href="/test" style="color: #06f;">查看系统状态</a></small> </div>`} <div id="app"> <header class="site-header"> <div class="container flex"> <h1 class="title">板卡管理</h1> <div style="margin-left: auto;"> <a href="/test" style="color: #8be9fd; text-decoration: none; font-size: 0.9em;">系统状态</a> </div> </div> </header> <main class="container"> <section class="mb-16"> ${renderComponent($$result, "FilterBar", FilterBar, { "client:load": true, "vendorList": vendorList, "categories": categories, "initialVendorId": vendorId, "initialCategory": category, "client:component-hydration": "load", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/FilterBar", "client:component-export": "default" })} </section> ${error && renderTemplate`<p class="text-danger">加载失败：${error.message}</p>`} ${!boards || boards.length === 0 ? renderTemplate`<p>暂无数据，请前往 管理员入口 添加，或更换筛选条件。</p>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate` <table> <thead> <tr> <th>公司</th> <th>型号</th> <th>类型</th> <th>驱动</th> <th>官网</th> <th>创建时间</th> </tr> </thead> <tbody> ${boards?.map((b) => renderTemplate`<tr> <td> ${b.vendors?.name ? b.vendors?.website ? renderTemplate`<a${addAttribute(b.vendors.website, "href")} target="_blank" rel="noreferrer"> ${b.vendors.name} </a>` : b.vendors.name : "-"} </td> <td>${b.model}</td> <td>${b.category || "-"}</td> <td> ${Array.isArray(b.drivers) && b.drivers.length > 0 ? renderTemplate`<ul class="list-drivers"> ${b.drivers.map((d) => renderTemplate`<li> <a${addAttribute(d.driver_url, "href")} target="_blank" rel="noreferrer"> ${d.os}${d.version ? ` \xB7 ${d.version}` : ""}${d.duplex_mode ? ` \xB7 ${d.duplex_mode}` : ""} </a> </li>`)} </ul>` : "-"} </td> <td> ${b.board_website ? renderTemplate`<a${addAttribute(b.board_website, "href")} target="_blank" rel="noreferrer">
查看
</a>` : "-"} </td> <td>${fmtDate(b.created_at)}</td> </tr>`)} </tbody> </table> <section class="mt-16"> ${renderComponent($$result2, "PaginationIsland", null, { "client:only": "react", "current": page, "total": totalCount || 0, "pageSize": pageSize, "client:component-hydration": "only", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/PaginationIsland", "client:component-export": "default" })} </section> ` })}`} </main> ${renderComponent($$result, "Footer", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/Volumes/SanXiaoXing/Work/Boards/src/components/Footer", "client:component-export": "default" })} </div> <div id="loading-overlay" hidden> <div class="spinner" aria-label="正在加载"></div> </div> ${renderScript($$result, "/Volumes/SanXiaoXing/Work/Boards/src/pages/index.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
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
