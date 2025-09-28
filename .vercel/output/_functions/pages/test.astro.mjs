/* empty css                                 */
import { e as createComponent, f as createAstro, k as renderHead, h as addAttribute, r as renderTemplate } from '../chunks/astro/server_3dssWMWE.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Test = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  const timestamp = (/* @__PURE__ */ new Date()).toISOString();
  const environment = {
    nodeEnv: process.env.NODE_ENV,
    vercel: process.env.VERCEL,
    vercelEnv: process.env.VERCEL_ENV
  };
  return renderTemplate`<html lang="zh-CN" data-astro-cid-6d7mwtum> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>部署测试页面</title>${renderHead()}</head> <body data-astro-cid-6d7mwtum> <h1 data-astro-cid-6d7mwtum>🧪 Serverless 部署测试</h1> <div class="status success" data-astro-cid-6d7mwtum> <h2 data-astro-cid-6d7mwtum>✅ 基本功能正常</h2> <p data-astro-cid-6d7mwtum>页面成功渲染，Serverless 函数运行正常</p> <p data-astro-cid-6d7mwtum><strong data-astro-cid-6d7mwtum>时间戳:</strong> ${timestamp}</p> </div> <div class="status info" data-astro-cid-6d7mwtum> <h2 data-astro-cid-6d7mwtum>🌍 环境信息</h2> <pre data-astro-cid-6d7mwtum>${JSON.stringify(environment, null, 2)}</pre> </div> <div${addAttribute(`status ${"success" }`, "class")} data-astro-cid-6d7mwtum> <h2 data-astro-cid-6d7mwtum>🔑 环境变量检查</h2> <p data-astro-cid-6d7mwtum><strong data-astro-cid-6d7mwtum>Supabase URL:</strong> ${"✅ 已配置" }</p> <p data-astro-cid-6d7mwtum><strong data-astro-cid-6d7mwtum>Supabase Key:</strong> ${"✅ 已配置" }</p> </div> <div class="status info" data-astro-cid-6d7mwtum> <h2 data-astro-cid-6d7mwtum>📝 测试说明</h2> <p data-astro-cid-6d7mwtum>如果你能看到这个页面，说明：</p> <ul data-astro-cid-6d7mwtum> <li data-astro-cid-6d7mwtum>Vercel Serverless 函数正常工作</li> <li data-astro-cid-6d7mwtum>Astro SSR 渲染正常</li> <li data-astro-cid-6d7mwtum>基本的环境变量访问正常</li> </ul> <p data-astro-cid-6d7mwtum><a href="/" style="color: #06f;" data-astro-cid-6d7mwtum>返回主页</a></p> </div> </body></html>`;
}, "/Volumes/SanXiaoXing/Work/Boards/src/pages/test.astro", void 0);
const $$file = "/Volumes/SanXiaoXing/Work/Boards/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
