import { IConfig } from 'umi-types';
const path=require('path');
const config: IConfig =  {
  treeShaking: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      title: 'zooo',
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
          /comp\//,
          /config\//,
          /config./,
        ],
      },
    }],
  ],
  alias: {
    src: path.resolve(__dirname, 'src/'),
    components: path.resolve(__dirname, 'src/components'),
  },
  "proxy": {
    "/api": {
      // "target": "http://dev.1809.tm",//需要添加 /api
      "target": "http://139.9.233.106:9098",// 外网开发访问
      // "target": "http://192.168.3.13:8080", // 国产
      // "target": "http://192.168.3.206:8080",// 国产
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "/api" }
    },
  }
};

export default config;
