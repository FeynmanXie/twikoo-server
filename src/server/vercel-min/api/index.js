// 引入 Twikoo 核心库
const twikoo = require('twikoo-vercel');

module.exports = async (req, res) => {
  // 允许跨域的源列表
  const allowedOrigins = [
    'http://localhost:4000',           // 本地开发环境
    'https://feynmanxie.pages.dev/',         // 正式站点
  ];

  const origin = req.headers.origin;

  if (origin && (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development')) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*'); // 默认允许全部（不推荐用于敏感接口）
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // 处理预检请求
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 调用 Twikoo 主逻辑
    await twikoo(req, res);
  } catch (err) {
    console.error('Twikoo服务出错:', err);
    res.status(500).json({
      code: 500,
      message: '评论系统内部错误'
    });
  }
};
