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
  const f = (arr: Array<any>) => {
    if (_isEmpty(arr)) {
      return arr;
    }
    arr.map(it => {
      if (!_isNumber(it.colSpan)) {
        if (_isEmpty(it.children)) {
          it.colSpan = 1;
        } else {
          if (it.children.length >= 2) { //在进入递归之前可以把增加额外的东西
            it.children.unshift({
              'k0501': it.k0501 + '00',
              'k0505': '小计',
            });
          }
          f(it.children); // 又没累加上来，还有children的，甩下去遍历
          it.colSpan = it.children.reduce((all: number, item: { colSpan: 0 }) => {
            return all + item.colSpan;
          }, 0);
        }
      }
    });
    return arr;
  };
  const fc = (arr: Array<any>) => {
    arr.map(it => {
      const step = stepFunc(it);
      if (!_isEmpty(it.children)) {
        it.rowSpan = 1;
        it.step = step;
        fc(it.children);
      } else {
        it.step = step;
        it.rowSpan = depthRef.current - step;
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

    // 树最大深度
    depthRef.current = maxDeep(_data);
    // 加上rowSpan和colSpan
    _data = fc(f(_data));
    // 平铺树，按层级分组
    let teamArr = groupBy(treeToList(_data, true), 'step');

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

