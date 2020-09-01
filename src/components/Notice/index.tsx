import React from "react";
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { InfoCircleOutlined } from '@ant-design/icons';
import { notification, message, Modal } from "antd";
import isEmpty from 'lodash/isEmpty';
import styles from './index.less';
const witNotification=(msg?:string,desc?:string,icon?:string,color?:string,time?:number)=>{
  notification.open({
    message: isEmpty(msg)?'提醒':msg,
    description: isEmpty(desc)?'':desc,
    icon: <LegacyIcon type={isEmpty(icon)?"smile-circle":icon} style={{ color: isEmpty(color)?'#108ee9':color }} />,
    duration: !isEmpty(time)?time:8,
  })
};

export default witNotification;

export const success = (msg = '操作成功') => {
  message.success(msg);
};

export const error = (msg = '操作失败') => {
  message.error(msg);
};

export const msgInfo = (msg = '操作失败',duration=3) => {
  message.info(msg,duration);
};

export const msgDestroy = () => {
  message.destroy();
};

export const serviceError=(msg='系统繁忙',msgDetail)=>{
  Modal.destroyAll();
  Modal.confirm({
    title: msg,
    icon: <InfoCircleOutlined />,
    content: msgDetail ? msgDetail.substr(0,60) : null,
    okText: msgDetail ? '下载日志信息' : '确定',
    cancelText: '取消',
    onOk:()=>{
      if(msgDetail){
        // 创建隐藏的可下载链接
        let eleLink = document.createElement('a');
        eleLink.download = `日志信息${new Date().valueOf()}.txt`;
        eleLink.style.display = 'none';
        // 字符内容转变成blob地址
        const blob = new Blob([msgDetail]);
        eleLink.href = URL.createObjectURL(blob);
        // 触发点击
        document.body.appendChild(eleLink);
        eleLink.click();
        // 然后移除
        document.body.removeChild(eleLink)
      }
    },
    className: styles.dal
  });
};
