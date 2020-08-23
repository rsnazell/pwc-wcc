const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/data",
    createProxyMiddleware({
      target: "http://api.openweathermap.org",
      changeOrigin: true,
    })
  );
};
