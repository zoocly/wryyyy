import React, { useMemo } from 'react';
export default function index(prop:any) {
  const {a = '', children = ''} = prop;
  const renderA = (a:any) =>{
    // 使用useMemo避免不必要的render
    console.log('render a');
    return `a 改变了 ${a} 次`;
  };
  console.log('render son inside');
  return (
    <div style={{marginTop:20}}>
      <h1>
        这个是儿啊
      </h1>
      <div>
        {
          useMemo(()=>{
            return renderA(a)
          },[a])
        }
      </div>
      <div>
        {
          useMemo(()=>{
            console.log('render children');
            return (
              <div>
                {children}
              </div>
            )
          },[children])
        }
      </div>
    </div>
  )
}

