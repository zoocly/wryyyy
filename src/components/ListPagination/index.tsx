import React from 'react';
import { Pagination, Select } from 'antd';
import styles from './index.less';

const defaultPageSelects = ['10', '20', '30', '40'];
interface pageProps {
  pagination:{pageSize:number,total:number,page?:number},
  pageSelects?:Array<any>,
  onChange?:(page?:number|string,pageSize?:number|string)=>void,
  showPageChange?:Boolean,
}
class ListPagination extends React.Component<pageProps,any> {
    //生命周期--构造函数
    constructor(props) {
        super(props);
        this.state = {
          current: 1,
          pageSize: 20
        };
    }
    //生命周期--组件渲染
    render() {
        const { pagination, pageSelects, showPageChange } = this.props;
        let { pageSize, total } = pagination;
        const { current } = this.state;
        if (pageSize && total && total !== 0) {
            return (
                <div className={styles.container}>
                    <div className={styles.paginationTotal}>{`共 ${pagination['total']} 项`}</div>
                    <div className={styles.paginationBtn}>
                        <Pagination current={current} { ...pagination} className={styles.seltBtn} onChange={this.handlePaginationChange} />
                        <div className={styles.sizeChanger}>
                          {
                            showPageChange && <React.Fragment>
                              <span>每页</span>
                              {
                                pageSelects && pageSelects.length ?
                                  <Select value={`${pageSize || pageSelects[0]}`} className={styles.sizeChangerBtn} onChange={this.handleSelectChange}>
                                    {
                                      pageSelects.map(item => (
                                        <Select.Option key={item} value={item}>{item}</Select.Option>
                                      ))
                                    }
                                  </Select>
                                  :
                                  <Select value={`${pageSize || defaultPageSelects[0]}`} className={styles.sizeChangerBtn} onChange={this.handleSelectChange}>
                                    {
                                      defaultPageSelects.map(item => (
                                        <Select.Option key={item} value={item}>{item}</Select.Option>
                                      ))
                                    }
                                  </Select>
                              }
                              <span>项</span>
                            </React.Fragment>
                          }

                        </div>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
    // ==组件所有操作函数
    //点击分页的时候
    handlePaginationChange = (current, pageSize) => {
        const { onChange } = this.props;
        this.setState({
          current,
          pageSize
        });
        if (onChange) {
            onChange(current, pageSize);
        }
    };
    // 点击每页多少项的时候
    handleSelectChange = pageSize => {
        const { onChange } = this.props;
        this.setState({
          current: 1,
          pageSize: parseInt(pageSize, 10)
        });
        if (onChange) {
            onChange(1, parseInt(pageSize, 10));
        }
    };
}

export default ListPagination;
