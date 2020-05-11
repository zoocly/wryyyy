const path=require('path');
export default {
  antd: {},
  dva: {},
  dynamicImport: {},
  title: 'zooo',
  alias: {
    src: path.resolve(__dirname, 'src/'),
    components: path.resolve(__dirname, 'src/components'),
  },
  proxy: {
    "/api": {
      // "target": "http://dev.1809.tm",//需要添加 /api
      "target": "http://139.9.233.106:9098",// 外网开发访问
      // "target": "http://192.168.3.13:8080", // 国产
      // "target": "http://192.168.3.206:8080",// 国产
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "/api" }
    },
  }
}
