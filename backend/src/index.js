const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

const accountServiceProxy = createProxyMiddleware('/api/accounts', {
  target: 'http://localhost:3001',
  pathRewrite: { '^/api/accounts': '' },
  changeOrigin: true
});

const productServiceProxy = createProxyMiddleware('/api/products', {
  target: 'http://localhost:3002',
  pathRewrite: { '^/api/products': '' },
  changeOrigin: true
});

const paymentServiceProxy = createProxyMiddleware('/api/payments', {
  target: 'http://localhost:3003',
  pathRewrite: { '^/api/payments': '' },
  changeOrigin: true
});

app.use(accountServiceProxy);
app.use(productServiceProxy);
app.use(paymentServiceProxy);

app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
