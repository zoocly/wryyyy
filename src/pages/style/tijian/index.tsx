import React, { Fragment, useState } from 'react';
import { Button, List, Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import style from './index.less';
import _get from 'lodash/get';
import { awsl } from '@/pages/services/login';

const index = () => {
  const _data = [
    {
      key: 1,
      text: 'Racing car sprays burning fuel into crowd.',
      loading: false,
    },
    {
      key: 2,
      text: 'Japanese princess to wed commoner.',
      loading: false,
    },
    {
      key: 3,
      text: 'Australian walks 100km after outback crash.',
      loading: false,
    },
    {
      key: 4,
      text: 'Man charged over missing wedding girl.',
      loading: false,
    },
    {
      key: 5,
      text: 'Los Angeles battles huge wildfires.',
      loading: false,
    },
  ];
  const [data, setData] = useState(_data);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const onClick = async () => {
    for (let i = 0; i <= _data.length - 1; i++) {
      const item = _data[i];
      setLoadingIndex(item.key);
      const res = await awsl({});
      // if (i % 2 !== 0) {
      //   await setData(arr => arr.filter(it => it.key !== item.key));
      // }
      if (data.length - 1 === i) {
        setLoadingIndex(-1);
      }
    }
  };
  const head = () => {
    return (
      <div className={style.head}>
        <div className={style.left}>
          <div>
            转圈
          </div>
          <div>
            <div>
              {
                loadingIndex === -1 &&
                <Fragment>
                  检查完成
                </Fragment>
              }
              {
                loadingIndex === 0 &&
                <Fragment>
                  准备检查
                </Fragment>
              }
              {
                loadingIndex !== 0 && loadingIndex !== -1 &&
                <Fragment>
                  <span>正在检查：{_get(_data, `[${loadingIndex - 1}].text`, '')}</span>
                </Fragment>
              }
            </div>
            <div>
              {(loadingIndex < 0 ? _data.length : loadingIndex) / _data.length * 100}%
            </div>
          </div>
        </div>
        <Button onClick={onClick}>点我</Button>
      </div>
    );
  };
  return (
    <div>
      <List
        header={head()}
        bordered
        dataSource={data}
        renderItem={(item, index) => {
          return (
            <List.Item>
              <Spin spinning={loadingIndex === item.key}
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              <Typography.Text mark>{item.key}</Typography.Text> {item.text}
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default index;
