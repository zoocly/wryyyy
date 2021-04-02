import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';

const fakeLine = (arr: Array<any>) => {
  let num = 0;
  const addNum = (arr: Array<any>) => {
    arr.map(it => {
      if (_isEmpty(it.children)) {
        num += 1;
      } else {
        addNum(it.children);
      }
    });
    return num;
  };
  return addNum(arr);
};
const Colgroup = (props: any) => {
  const { tree, nodeWith = 100 } = props;
  let num = fakeLine(tree);
  let gird = [new Array(num).fill('').map(() => {
    return { value: ' ' };
  })];
  return (
    <Fragment>
      {
        useMemo(() => {
          return (
            <colgroup>
              {
                new Array(_get(gird, '[0].length', 1)).fill('').map((i, index) => <col key={index}
                                                                                       style={{ width: nodeWith }}/>)
              }
            </colgroup>
          );
        }, [num])
      }
    </Fragment>

  );
};
const Head = (props: any) => {
  const { tree, nodeName, stepFunc } = props;
  const depthRef = useRef(0);

  const [team, setTeam] = useState<Array<any>>([]);

  const maxDeep = (arr: Array<any>) => {
    let max = 0;
    if (_isEmpty(arr)) {
      return 0;
    }
    arr.map(it => {
      let count = maxDeep(it.children);
      if (max < count) {
        max = count;
      }
    });
    return max + 1;
  };
  const addNum = (arr: Array<any>) => {
    arr.map(it => {
      if (_isEmpty(it.children)) {
        it.colSpan = 1;
      } else {
        addNum(it.children);
      }
    });
    return arr;
  };
  const f = (arr: Array<any>) => {
    if (_isEmpty(arr)) {
      return arr;
    }
    arr.map(it => {
      if (!_isNumber(it.colSpan) || it.colSpan === 0) {
        if (!_isEmpty(it.children)) {
          f(it.children);
          it.colSpan = it.children.reduce((total: number, item: any) => {
            return total + item.colSpan;
          }, 0);
        } else {
          it.colSpan = 1;
        }
      }
    });
    return arr;
  };
  const getLv = (it: any, arrs: any) => {
    let num = 0;
    const toFind = (arr: any) => {
      for (let i = 0; i < arr.length; i++) {
        num = 0;
        let item = arr[i];
        if ((!_isEmpty(item['key']) && item['key'] === it.key) || item['k0500'] === it['k0500']) {
          return;
        } else {
          if (!_isEmpty(item.children)) {
            num++;
            toFind(item.children);
          }
        }
      }
    };
    toFind(arrs);
    return num;
  };
  const fc = (arrs: Array<any>) => {
    let arr2 = _cloneDeep(arrs);
    const fcc = (arr: any) => {
      arr.map((it: any) => {
        if (!_isEmpty(it.children)) {
          it.rowSpan = 1;
          fcc(it.children);
        } else {
          it.rowSpan = depthRef.current - getLv(it, arr2) + 1;
        }
      });
    };
    fcc(arrs);
    return arrs;
  };
  const getGP = (arr: any) => {
    let num = 0;
    let a: any = [];
    const GP = (arrs: any) => {
      let b: any = [];
      arrs.map((it: any, index: number) => {
        const { children, ...its } = it;
        a[num] = [..._isEmpty(a[num]) ? [] : a[num], { ...its }];
        b = [...b, ..._isEmpty(children) ? [] : children];
      });
      num++;
      if (!_isEmpty(b)) {
        GP(b);
      }
    };
    GP(arr);
    return a;
  };

  useEffect(() => {
    let _data = _cloneDeep(tree);
    // 树深度
    let depth = maxDeep(_data);
    depthRef.current = depth;
    // 加上rowSpan和colSpan
    _data = f(_data);
    _data = fc(_data);
    // 平铺树，按层级分组
    let teamArr = getGP(_data);
    setTeam(teamArr);
    return () => {
      setTeam([]);
      depthRef.current = 0;
    };
  }, [JSON.stringify(tree)]);

  return (
    <thead>
    {
      team.map((it: any, index: number) => {
        return (
          <tr key={index}>
            {
              it.map((item: any, indexx: number) => {
                return (
                  <td style={{ border: ' 1px solid #000', textAlign: 'center' }} key={indexx} colSpan={item.colSpan}
                      rowSpan={item.rowSpan}>{item[nodeName]}</td>
                );
              })
            }
          </tr>
        );
      })
    }
    </thead>
  );
};
export { Head, Colgroup, fakeLine };

