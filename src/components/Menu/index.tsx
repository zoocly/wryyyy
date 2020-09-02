import React, {useEffect, useState} from 'react';
import { Menu, Skeleton, Spin } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import { history } from "umi";
import {connect} from "react-redux";
const { SubMenu } = Menu;
function index(props:any) {
  const { login:{ menuDataTree = [] }={} } = props;
  const [ selectedKey, setSelectedKeys ] = useState<string>('');
  const [ openKey, setOpenKeys ] = useState<Array<any>>([]);
  useEffect(()=>{
    props.dispatch({
      type:'login/getMenu',
      payload:{}
    });
  },[]);
  useEffect(()=>{
    getFirstItem();
  },[JSON.stringify(menuDataTree)]);

  const getFirstItem = () =>{
    let keys = sessionStorage.getItem('keys') || '';
    let openKeys = sessionStorage.getItem('openKeys') || '';
    setSelectedKeys(keys);
    if(!_isEmpty(openKeys)){
      setOpenKeys(openKeys.split(','));
    }
  };
  const itemClick = (item:any) => {
    const { url = '' } = item || {};
    setSelectedKeys(item['code']);
    sessionStorage.setItem('keys',item['code']);
    history.push(url);
  };
  const openItem = (item:any) =>{
    const {code = undefined} = item || {};
    if(openKey.includes(code)){
      let keys = openKey.filter(it=>it != code);
      setOpenKeys(keys);
      sessionStorage.setItem('openKeys',keys.toString());
    }else {
      setOpenKeys([...openKey,code]);
      sessionStorage.setItem('openKeys',[...openKey,code].toString());
    }
  };
  const renderMenuItem = (arr:Array<any>) => {
    return arr.map(it=>{
      if(_get(it,'children.length',0) > 0){
        return (
          <SubMenu
            onTitleClick={()=>openItem(it)}
            key={it['code']}
            title={<span>{it['icon']}<span>{it['name']}</span></span>}
          >
            { renderMenuItem(it.children) }
          </SubMenu>
        );
      }else {
        return (
          <Menu.Item key={it['code']} onClick={()=>itemClick(it)}>
            {it['icon'] || <SmileOutlined />}
            <span>{it['name']}</span>
          </Menu.Item>
        );
      }
    });
  };

  return (
    <div>
      <Menu theme="dark" selectedKeys={[selectedKey]} openKeys={openKey} mode="inline">
        {renderMenuItem(menuDataTree)}
      </Menu>
    </div>
  );
}
// @learnTS-ignore
export default connect(({login})=>({login}))(index);
