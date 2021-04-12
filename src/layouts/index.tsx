import React from 'react';
import { Layout, Breadcrumb, ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Menu from 'src/components/Menu';
import style from './index.css';
const { Header, Content, Footer, Sider } = Layout;
class BasicLayout extends React.Component<any, any> {
  constructor(props:any){
    super(props);
    this.state = {

    }
  };
  onCollapse=(collapsed:any)=>{
    this.setState({ collapsed });
  };
  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <ConfigProvider locale={zh_CN}>
          <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" />
            <Menu/>
          </Sider>
          <Layout className={style.content}>
            <Content style={{ margin: '16px 16px',height:'100%'}}>
              <div style={{ padding: 24, background: '#fff',height:'100%'}}>
                {children}
              </div>
            </Content>
          </Layout>
        </ConfigProvider>
      </Layout>
    )
  }
};

export default BasicLayout;
