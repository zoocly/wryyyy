import React, { forwardRef, useImperativeHandle, useState } from 'react';
import {Modal,Checkbox,Row,Col} from 'antd';
import style from './index.less';
import _isEmpty from 'lodash/isEmpty';
const CheckboxGroup = Checkbox.Group;
function index(props:object, ref:any) {
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ checked, setChecked ] = useState<Array<string>>([]);
  const [ finalCard, setFinalCard ] = useState<Array<object>>([]);
  const [ finalChart, setFinalChart ] = useState<Array<object>>([]);

  useImperativeHandle(ref, () => ({
    open:()=>{
      setVisible(!visible);
    }
  }));
  const handleOk = () => {

  };
  const handleCancel = () => {

  };
  const onChange = (val:any) => {
    setChecked(val)
  };
  const renderRow = (arr:Array<object>,style:any) =>{
    return (
      <Row gutter={16}>
        {
          !_isEmpty(arr) && arr.map((item:any)=>{
            const {value:{ coverImg = ''}={}, key = '', name = ''} = item || {};
            return (
              <Col span={8} key={key} style={{marginTop:'10px'}}>
                <Checkbox value={key} key={key}>
                  {
                    coverImg ? <img src={coverImg} style={style}/> : <span>{name}</span>
                  }
                </Checkbox>
              </Col>
            )
          })
        }
      </Row>
    )
  };
  return (
    <Modal  destroyOnClose
            title="编辑"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            confirmLoading={loading}
            width={1000}
            bodyStyle={{height:560,overflow:'auto'}}
    >
      <div className={style.OverViewCardBox}>
        <CheckboxGroup
          onChange={onChange}
          value={checked}
        >
          {renderRow(finalCard,{width:'100%',height:'117px'})}
          {renderRow(finalChart,{width:'100%',height:'210px'})}
        </CheckboxGroup>
      </div>
    </Modal>
  );
}
export default forwardRef(index);
