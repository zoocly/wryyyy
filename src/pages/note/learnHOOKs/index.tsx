import React, { useState } from 'react';
import { Tabs  } from 'antd';
import UseEffect from './useeffect';
import UseContext from './useContext';
const { TabPane } = Tabs;
const index = () =>{
  const [ tab, setTab ] = useState('2');
  const onChange = (key:string) =>{
    setTab(key);
  };
  return (
    <div>
      <Tabs onChange={(val:string)=>onChange(val)} activeKey={tab}>
        <TabPane tab="useEffect" key="1">
          { tab === '1' &&  <UseEffect/>}
        </TabPane>
        <TabPane tab="useContext" key="2">
          { tab === '2' &&  <UseContext/>}
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  )
};
export default index;
