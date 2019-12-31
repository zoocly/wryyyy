import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Menu from 'src/components/Menu';
import style from './index.css';
import L2Dwidget from '../../public/L2Dwidget.min.js'
const { Header, Content, Footer, Sider } = Layout;
function initL2Dwidget() {
  console.log(L2Dwidget,'sss')
  // L2Dwidget.init({
  //     dialog: {
  //       // 开启对话框
  //       enable: true,
  //       script: {
  //         // 当触摸到角色身体
  //         'tap body': '哎呀！别碰我！',
  //         // 当触摸到角色头部
  //         'tap face': '人家是在认真写博客哦--前端妹子',
  //       }
  //     },
  //     display: {
  //       position: 'right'
  //     },
  //     "model": { "jsonPath": "live2d-widget-model-z16/assets/z16.model.json" },
  //     "mobile": { "show": true, scale: 0.5 },
  //   });
}
class BasicLayout extends React.Component<any, any> {
  constructor(props:any){
    super(props);
    this.state = {

    }
  };
  componentWillMount(): void {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '../public/L2Dwidget.min.js';
    document.head.appendChild(script);
  }

  componentDidMount(): void {
    // initL2Dwidget();
  }

  onCollapse=(collapsed:any)=>{
    this.setState({ collapsed });
  };
  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu/>
        </Sider>
        <Layout className={style.content}>
          <Content style={{ margin: '16px 16px',height:'100%'}}>
            <div style={{ padding: 24, background: '#fff'}}>
              { children }
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
};

export default BasicLayout;
