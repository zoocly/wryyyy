import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import {Modal,Checkbox,Row,Col} from 'antd';
import style from './index.less';
import _isEmpty from 'lodash/isEmpty';
import { getDictChartList, saveChart } from './servers';
import { error } from 'components/Notice';
const CheckboxGroup = Checkbox.Group;
function index(props:any, ref:any) {
  const { chartType = '', cardConfig = [], check = [], submit } = props;
  const [ visible, setVisible ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ checked, setChecked ] = useState<Array<string>>([]);
  const [ finalCard, setFinalCard ] = useState<Array<object>>([]);
  const [ finalChart, setFinalChart ] = useState<Array<object>>([]);

  useImperativeHandle(ref, () => ({
    open:handleCancel
  }));
  useEffect(()=>{
    setChecked(check);
  },[JSON.stringify(check)]);
  useEffect(()=>{
    // 请求总图表
    getDict();
  },[]);
  const getDict = async () => {
    const {code = 500 ,data} = await getDictChartList(chartType);
    let final:Array<any> = [];
    if(code === 0 && !_isEmpty(data) && !_isEmpty(cardConfig)){
      data.map((item:any)=>{
        cardConfig.map((it:any)=>{
          if(it.key === item.key){
            final.push(item);
          }
        })
      });
      setFinalCard(final.filter(({type}) => type === 'card'));
      setFinalChart(final.filter(({type}) => type === 'chart'));
    }
  };
  const handleOk = async () => {
    if(!_isEmpty(checked) && checked.length >= 1){
      let payload:Array<object> = [];
      [...finalCard,...finalChart].map((item:any)=>{
        checked.map((it:any)=>{
          if(it === item['key']){
            payload.push({key:item['key'],name:item['name']})
          }
        })
      });
      setLoading(true);
      const {code = 500} = await saveChart({
        data:{
          [`${chartType}`]:payload
        }
      });
      setLoading(false);
      if(code === 0){
        submit && submit(checked);
        handleCancel();
      }
    }else {
      error('至少选择一项保存');
    }
  };
  const handleCancel = () => {
    setVisible(val=>!val);
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
                    coverImg ? <img alt={name} src={coverImg} style={style}/> : <span>{name}</span>
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
    <Fragment>
    <Modal destroyOnClose
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
    </Fragment>
  );
}
export default forwardRef(index);
