#!/usr/bin/env node

// 部署前检查脚本
console.log('🔍 开始部署前检查...\n');

// 检查必需的环境变量
const requiredEnvVars = [
  'PUBLIC_SUPABASE_URL',
  'PUBLIC_SUPABASE_ANON_KEY'
];

let hasErrors = false;

console.log('📋 检查环境变量:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`  ✅ ${varName}: 已配置`);
  } else {
    console.log(`  ❌ ${varName}: 缺失`);
    hasErrors = true;
  }
});

console.log('\n🏗️  检查构建配置:');

// 检查关键文件
const fs = require('fs');
const path = require('path');

const criticalFiles = [
  'astro.config.mjs',
  'vercel.json',
  'package.json',
  'src/lib/supabase.ts',
  'src/lib/cache.ts',
  'src/lib/env-check.ts'
];

criticalFiles.forEach(file => {
  if (fs.existsSync(path.join(process.cwd(), file))) {
    console.log(`  ✅ ${file}: 存在`);
  } else {
    console.log(`  ❌ ${file}: 缺失`);
    hasErrors = true;
  }
});

console.log('\n📦 检查依赖:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const requiredDeps = [
    '@astrojs/vercel',
    '@supabase/supabase-js',
    'astro'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      console.log(`  ✅ ${dep}: 已安装`);
    } else {
      console.log(`  ❌ ${dep}: 缺失`);
      hasErrors = true;
    }
  });
} catch (e) {
  console.log('  ❌ 无法读取 package.json');
  hasErrors = true;
}

console.log('\n' + '='.repeat(50));

if (hasErrors) {
  console.log('❌ 检查失败！请修复上述问题后再部署。');
  process.exit(1);
} else {
  console.log('✅ 所有检查通过！可以安全部署。');
  console.log('\n💡 部署建议:');
  console.log('  1. 确保在 Vercel 中配置了环境变量');
  console.log('  2. 检查 Supabase 连接是否正常');
  console.log('  3. 监控部署日志中的错误信息');
  process.exit(0);
}