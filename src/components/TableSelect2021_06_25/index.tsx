import React, { FC, Fragment, useEffect, useImperativeHandle, useState } from 'react';
import { Input, Modal, Table, Form } from 'antd';
import ListTable from '@/components/ListTable';
import ListPagination from '@/components/ListPagination';
// @ts-ignore
import request from '@/utils/request';
import qs from 'qs';
import isEmpty from 'lodash/isEmpty';
import _isEmpty from 'lodash/isEmpty';
import _uniqBy from 'lodash/uniqBy';
import _isArray from 'lodash/isArray';

interface Interface {
  action: string,
  columns: Array<object>,
  title: string,
  payload?: object,
  method?: 'POST' | 'Get',
  width?: string,
  rowSelectionType?: 'radio' | 'checkbox',
  initValue?: Array<any>,
  rowKey?: string,
  scroll?: object,
  otherRowSelection?: object,
  footer?: any,

  hasSelect?: boolean,
  hasPagination?: boolean,
  hasTableNums?: boolean,

  renderTableQuery?: Function,
  inputValueRender?: Function,
  renderSearch?: Function,
  closeCallBack?: Function,
  onSubmit: Function,
  onSearchCallBack?:Function,
}

const index: FC<Interface> = (props: any, ref: any) => {
  const {
    action = '',
    payload = {}, //内部的table表额外请求参数
    method = 'POST',
    hasOwnShowComp = false,
    closeCallBack,
    title,
    width = 1000,
    columns,
    renderSearch,
    rowSelectionType = 'radio',
    hasPagination = true,
    inputValueRender = undefined, //有默认input时，回调渲染函数
    initValue = [],
    rowKey = 'code',
    renderTableQuery = undefined, //列表请求接口回调
    hasSelect = true,
    scroll = {},
    otherRowSelection = {},
    footer,
    hasTableNums = true,
    onSearchCallBack,
  } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState({ pageSize: 10, total: 0, page: 1 });
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [inputValue, setInputValue] = useState<any>('');
  const [query, setQurey] = useState({});
  const [search, setSearch] = useState({});


  const getList = (pageNum: number, pageSize = 10) => {
    const requestRes = (res: any) => {
      const { code = 500, list = [], pagination = {} } = res;
      setTableLoading(false);
      if (code === 0) {
        if (renderTableQuery) {
          const { list = [], pagination = {} } = renderTableQuery(res);
          setList(list);
          setPagination(pagination);
        } else {
          setList(list);
          setPagination(pagination);
        }
      }
    };
    let data = {
      pageNum,
      pageSize,
      ...payload,
      ...search,
      ...query,
    };
    let body = {
      data,
    };
    setTableLoading(true);
    if (action) {
      switch (method) {
        case 'POST':
          request(action, {
            method,
            body,
          }).then((res: any) => requestRes(res));
          break;
        case 'Get':
          request(`${action}?${qs.stringify(data)}`, {
            method,
          }).then((res: any) => requestRes(res));
          break;
      }
    }
  };
  const handleOk = async () => {
    const { onSubmit } = props;
    setConfirmLoading(true);
    const resCode = await onSubmit({ selectedRowKeys, selectedItems, query });
    setConfirmLoading(false);
    if (!hasOwnShowComp) {
      setInputValueFunc({ selectedRowKeys, selectedItems });
    }
    resCode === 0 && handleCancel();
  };
  const handleCancel = () => {
    setVisible(false);
    closeCallBack && closeCallBack();
  };
  useImperativeHandle(ref, () => ({
    open: (query: object) => {
      setQurey({ ...query, _key: +new Date() });
    },
    clear: () => {
      clear();
    },
  }));
  const open = () => {
    setVisible(true);
  };
  const onPageChange = (page: number) => {
    getList(page);
  };
  const onSelectChange = (keys: any, rows: any) => {
    const { onChange } = props;
    let finalKeys = [];
    let finalRows = [];
    if (!isEmpty(keys)) {
      finalKeys = keys;
      // @ts-ignore
      finalRows = _uniqBy([...selectedItems, ...rows], rowKey).filter(it =>
        keys.includes(it[rowKey]),
      );
    }
    setSelectedRowKeys(finalKeys);
    setSelectedItems(finalRows);
    onChange && onChange(finalRows);
  };
  const { page, pageSize } = pagination;
  let final = [
    {
      title: '序号',
      dataIndex: 'num',
      width: 60,
      align: 'center',
      render: (text: string, record: object, index: number) => {
        if (!hasPagination) {
          return index + 1;
        }
        return (page - 1) * pageSize + index + 1;
      },
    },
    ...columns,
  ];
  if (!hasTableNums) {
    final = final.filter(it => it.dataIndex !== 'num');
  }
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: rowSelectionType,
    ...otherRowSelection,
  };
  const setInputValueFunc = ({ selectedRowKeys = [], selectedItems = [] } = {}) => {
    let val = '';
    if (inputValueRender) {
      val = selectedItems
        .map(it => {
          return inputValueRender(it);
        })
        .toString();

      setInputValue(val);
    }
  };
  const clear = () => {
    setInputValue(undefined);
    setSelectedItems([]);
    setSelectedRowKeys([]);
  };
  const searchCallBack=(value:any)=>{
    let _val = value;
    if(onSearchCallBack){
      _val = onSearchCallBack(value);
    }
    setSearch(_val);
  }


  useEffect(() => {
    if (!_isEmpty(query)) {
      open();
    }
  }, [JSON.stringify(query)]);
  useEffect(() => {
    // 初始化rowSelection
    if (!isEmpty(initValue) && _isArray(initValue)) {
      let keys: any = initValue.map(item => {
        return item[rowKey];
      });
      setSelectedItems(initValue);
      setSelectedRowKeys(keys);
      // @ts-ignore
      setInputValueFunc({ selectedRowKeys: keys, selectedItems: initValue });
    }
  }, [JSON.stringify(initValue)]);
  useEffect(() => {
    if (visible) {
      getList(1);
    }
    return () => {
      if (visible) {
        setList([]);
        setPagination({ pageSize: 10, total: 0, page: 1 });
        setSelectedRowKeys([]);
        setSelectedItems([]);
        setQurey({});
      }
    };
  }, [visible,search]);
  return (
    <Fragment>
      {!hasOwnShowComp && <Input onClick={open} value={inputValue}/>}
      <Modal
        title={title}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={width}
        destroyOnClose={true}
        confirmLoading={confirmLoading}
        footer={footer}
      >
        {renderSearch && renderSearch({list, form, query, selectedItems, selectedRowKeys, searchCallBack})}
        {hasPagination ? (
          <Fragment>
            <ListTable
              {...hasSelect ? { rowSelection } : {}}
              // @ts-ignore
              rowKey={record => record[rowKey]}
              loading={tableLoading}
              columns={final}
              scroll={scroll}
              data={list}
            />
            <ListPagination pagination={pagination}
              // @ts-ignore
                            onChange={onPageChange}/>
          </Fragment>
        ) : (
          <Fragment>
            <Table
              {...hasSelect ? { rowSelection } : {}}
              rowKey={record => record[rowKey]}
              columns={final}
              dataSource={list}
              bordered={true}
              pagination={false}
              scroll={{ y: 500 }}
            />
          </Fragment>
        )}
      </Modal>
    </Fragment>
  );
};

// @ts-ignore
export default React.forwardRef(index);

