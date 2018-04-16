export default {
  "publicPath": "/static/",
  "proxy": {
    "/api": {
      "target": "http://jsonplaceholder.typicode.com/",
      "changeOrigin": true,
      "pathRewrite": { "^/api": "" }
    }
  },
  "theme": {
    "primary-color": "#bfbfbf",
    "success-color": "#bfbfbf",
    "info-color": "#bfbfbf",
    "error-color": "#262626",
    "warning-color ": "#8c8c8c"
  },
}
