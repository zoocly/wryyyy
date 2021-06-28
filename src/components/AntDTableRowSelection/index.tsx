import React from 'react';

export const selfRowSelection = ({ selectedRowKeys, setSelectedRowKeys, setSelectedItem, selectType, rowKey }: any) => {
  return {
    selectedRowKeys,
    type: selectType,
    onSelect: (record: any, selected: any) => {
      setSelectedRowKeys((e: any) => {
        if (selected) {
          return [...new Set([...e, record[rowKey]])];
        } else {
          return e.filter((it: any) => it !== record[rowKey]);
        }
      });
      setSelectedItem((e: any) => {
        if (selected) {
          return [...new Set([...e, record])];
        } else {
          return e.filter((it: any) => it[rowKey] !== record[rowKey]);
        }
      });
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      setSelectedRowKeys((e: any) => {
        if (selected) {
          return [...new Set([...e, ...changeRows.map((it: any) => it[rowKey])])];
        } else {
          let arr = [...e];
          changeRows.map((it: any) => {
            arr = arr.filter(ot => ot !== it[rowKey]);
          });
          return arr;
        }
      });
      setSelectedItem((e: any) => {
        if (selected) {
          return [...new Set([...e, ...changeRows])];
        } else {
          let arr = [...e];
          changeRows.map((it: any) => {
            arr = arr.filter(ot => ot[rowKey] !== it[rowKey]);
          });
          return arr;
        }
      });
    },
  };
};
