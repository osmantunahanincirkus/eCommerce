const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const accountService = createProxyMiddleware({
  target: 'http://localhost:4001',
  pathRewrite: { '^/account': '' },
});

const productService = createProxyMiddleware({
  target: 'http://localhost:4002',
  pathRewrite: { '^/product': '' },
});

const paymentService = createProxyMiddleware({
  target: 'http://localhost:4003',
  pathRewrite: { '^/payment': '' },
});

app.use('/account', accountService);
app.use('/product', productService);
app.use('/payment', paymentService);

app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});