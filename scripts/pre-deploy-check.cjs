#!/usr/bin/env node

/**
 * 部署前检查脚本
 * 验证所有修复是否正确应用，确保部署成功
 */

const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

console.log('🔍 开始部署前检查...\n');

let hasErrors = false;

function checkError(message) {
  console.error(`❌ ${message}`);
  hasErrors = true;
}

function checkSuccess(message) {
  console.log(`✅ ${message}`);
}

// 1. 检查关键文件是否存在
console.log('📁 检查关键文件...');
const criticalFiles = [
  'astro.config.mjs',
  'vercel.json',
  'package.json',
  'src/lib/supabase.ts',
  'src/lib/error-boundary.ts',
  'src/pages/index.astro',
  'src/pages/test.astro'
];

criticalFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    checkSuccess(`${file} 存在`);
  } else {
    checkError(`${file} 缺失`);
  }
});

// 2. 检查环境变量配置
console.log('\n🔧 检查环境变量...');
const requiredEnvVars = [
  'PUBLIC_SUPABASE_URL',
  'PUBLIC_SUPABASE_ANON_KEY'
];

requiredEnvVars.forEach(envVar => {
  if (process.env[envVar]) {
    checkSuccess(`${envVar} 已配置`);
  } else {
    checkError(`${envVar} 未配置`);
  }
});

// 3. 检查 vercel.json 配置
console.log('\n⚙️ 检查 Vercel 配置...');
try {
  const vercelConfigPath = path.join(projectRoot, 'vercel.json');
  const vercelConfig = JSON.parse(fs.readFileSync(vercelConfigPath, 'utf8'));
  
  if (vercelConfig.functions && vercelConfig.functions['src/pages/**/*.astro']) {
    const funcConfig = vercelConfig.functions['src/pages/**/*.astro'];
    if (funcConfig.maxDuration >= 20) {
      checkSuccess(`函数超时时间设置为 ${funcConfig.maxDuration} 秒`);
    } else {
      checkError(`函数超时时间过短: ${funcConfig.maxDuration} 秒`);
    }
  } else {
    checkError('Vercel 函数配置缺失');
  }
  
  if (vercelConfig.framework === 'astro') {
    checkSuccess('Astro 框架配置正确');
  } else {
    checkError('Astro 框架配置错误');
  }
} catch (e) {
  checkError(`Vercel 配置读取失败: ${e.message}`);
}

// 4. 检查主页面是否使用了错误边界
console.log('\n🛡️ 检查错误边界实现...');
try {
  const indexPath = path.join(projectRoot, 'src/pages/index.astro');
  const indexContent = fs.readFileSync(indexPath, 'utf8');
  
  if (indexContent.includes('safeQuery')) {
    checkSuccess('主页面使用了安全查询');
  } else {
    checkError('主页面未使用安全查询');
  }
  
  if (indexContent.includes('getEnvironmentTimeout')) {
    checkSuccess('主页面使用了环境适配超时');
  } else {
    checkError('主页面未使用环境适配超时');
  }
  
  if (indexContent.includes('export const prerender = false')) {
    checkSuccess('主页面禁用了预渲染');
  } else {
    checkError('主页面预渲染配置错误');
  }
} catch (e) {
  checkError(`主页面检查失败: ${e.message}`);
}

// 5. 检查错误边界工具
console.log('\n🔧 检查错误边界工具...');
try {
  const errorBoundaryPath = path.join(projectRoot, 'src/lib/error-boundary.ts');
  const errorBoundaryContent = fs.readFileSync(errorBoundaryPath, 'utf8');
  
  if (errorBoundaryContent.includes('safeQuery')) {
    checkSuccess('错误边界工具包含安全查询函数');
  } else {
    checkError('错误边界工具缺少安全查询函数');
  }
  
  if (errorBoundaryContent.includes('withTimeout')) {
    checkSuccess('错误边界工具包含超时处理');
  } else {
    checkError('错误边界工具缺少超时处理');
  }
  
  if (errorBoundaryContent.includes('isServerlessEnvironment')) {
    checkSuccess('错误边界工具包含环境检测');
  } else {
    checkError('错误边界工具缺少环境检测');
  }
} catch (e) {
  checkError(`错误边界工具检查失败: ${e.message}`);
}

// 6. 检查测试页面
console.log('\n🧪 检查测试页面...');
try {
  const testPath = path.join(projectRoot, 'src/pages/test.astro');
  const testContent = fs.readFileSync(testPath, 'utf8');
  
  if (testContent.includes('PUBLIC_SUPABASE_URL')) {
    checkSuccess('测试页面包含环境变量检查');
  } else {
    checkError('测试页面缺少环境变量检查');
  }
} catch (e) {
  checkError(`测试页面检查失败: ${e.message}`);
}

// 7. 检查依赖项
console.log('\n📦 检查关键依赖...');
try {
  const packagePath = path.join(projectRoot, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredDeps = [
    '@astrojs/vercel',
    '@supabase/supabase-js',
    'astro'
  ];
  
  requiredDeps.forEach(dep => {
    if (packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]) {
      checkSuccess(`${dep} 依赖已安装`);
    } else {
      checkError(`${dep} 依赖缺失`);
    }
  });
} catch (e) {
  checkError(`依赖检查失败: ${e.message}`);
}

// 总结
console.log('\n📋 检查总结:');
if (hasErrors) {
  console.error('❌ 发现问题，请修复后再部署');
  process.exit(1);
} else {
  console.log('✅ 所有检查通过，可以安全部署');
  console.log('\n🚀 建议的部署步骤:');
  console.log('1. 确保环境变量在 Vercel 中正确配置');
  console.log('2. 运行 npm run build 确保构建成功');
  console.log('3. 部署到 Vercel');
  console.log('4. 访问 /test 页面验证环境状态');
  console.log('5. 访问主页面验证功能正常');
  process.exit(0);
}