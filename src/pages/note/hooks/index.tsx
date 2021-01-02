import React, { useState } from 'react';
import { Tabs  } from 'antd';
import Hookyaya from './components/hookyaya';
import UseEffect from './useeffect';
import UseContext from './useContext';
import UseState from './useState';
const { TabPane } = Tabs;
const index = () =>{
  const [ tab, setTab ] = useState('3');
  const onChange = (key:string) =>{
    setTab(key);
  };
  return (
    <div>
      <Hookyaya/>
      <Tabs onChange={(val:string)=>onChange(val)} activeKey={tab}>
        <TabPane tab="useEffect" key="1">
          { tab === '1' &&  <UseEffect/>}
        </TabPane>
        <TabPane tab="useContext" key="2">
          { tab === '2' &&  <UseContext/>}
        </TabPane>
        <TabPane tab="useState" key="3">
          { tab === '3' &&  <UseState/>}
        </TabPane>
      </Tabs>
    </div>
  )
};
export default index;
