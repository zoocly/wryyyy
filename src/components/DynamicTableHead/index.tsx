import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import _isNumber from 'lodash/isNumber';
import _get from 'lodash/get';
import { treeToList } from '@/utils/method.js';

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
                                                                                       style={{ width: nodeWith }} />)
              }
            </colgroup>
          );
        }, [num])
      }
    </Fragment>

  );
};
const Head = (props: any) => {
  const {
    tree,
    nodeName,
    stepFunc,
  } = props;
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
      if (!_isNumber(it.colSpan) || it.colSpan === 0) {  // 没有累加上来的colSpan
        if (!_isEmpty(it.children)) {
          let num = 0;
          f(it.children); // 又没累加上来，还有children的，甩下去遍历
          it.children.map((item: any) => {
            num += item.colSpan;
          });
          it.colSpan = num;
        }
      }
    });
    return arr;
  };
  const fc = (arr: Array<any>) => {
    arr.map(it => {
      if (!_isEmpty(it.children)) {
        it.rowSpan = 1;
        fc(it.children);
      } else {
        // it.rowSpan = depthRef.current - it[nodeKey].length/2 + 1 ;
        it.rowSpan = depthRef.current - stepFunc(it);
      }
    });
    return arr;
  };
  const groupBy = (array: Array<any>, name: string) => {
    const groups: any = {};
    array.forEach(function(o) {
      const group = JSON.stringify(o[name]);
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  };

  useEffect(() => {
    let _data = _cloneDeep(tree);
    // 树深度
    let depth = maxDeep(_data);
    depthRef.current = depth;
    // 加上rowSpan和colSpan
    _data = addNum(_data);
    for (let i = 0; i < depth - 1; i++) {
      _data = f(_data);
    }
    _data = fc(_data);
    // 平铺树，按层级分组
    let teamArr = groupBy(treeToList(_cloneDeep(_data), true).map((it: any) => {
      return { ...it, step: stepFunc(it) };
    }), 'step');
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

