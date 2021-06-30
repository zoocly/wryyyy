import React from 'react';
import { ConfigProvider, Layout } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import Menu from 'src/components/Menu';
import style from './index.css';

const { Header, Content, Footer, Sider } = Layout;

class BasicLayout extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      val: 0,
    };
  };

  componentDidMount() {
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);
    this.setState({ val: this.state.val + 1 });
    console.log(this.state.val);

    setTimeout(() => {
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
      this.setState({ val: this.state.val + 1 });
      console.log(this.state.val);
    }, 0);

    /*
    * 在 React 18 版本之前，上面代码的打印顺序是 0、0、2、3
    * 原因就是在 React 的事件函数和异步回调中的状态批处理机制不一样。
    * 在异步回调外面，能够将所有渲染合并成一次，异步回调里面，则不会合并，会渲染多次。
    *
    *
    * React 18 版本解决了这个问题，无论你是在 Promise、setTimeout、或者其他异步回调中更新状态，都会触发批处理，上面的代码真的就会一直打印 0、0、0、0 了
    * */
  };

  onCollapse = (collapsed: any) => {
    this.setState({ collapsed });
  };

  render(): React.ReactNode {
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <ConfigProvider locale={zh_CN}>
          <Sider collapsible={true} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo"/>
            <Menu/>
          </Sider>
          <Layout className={style.content}>
            <Content style={{ margin: '16px 16px', height: '100%' }}>
              <div style={{ padding: 24, background: '#fff', height: '100%' }}>
                {children}
              </div>
            </Content>
          </Layout>
        </ConfigProvider>
      </Layout>
    );
  }
};

export default BasicLayout;
