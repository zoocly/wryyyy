import React, { Fragment } from 'react';
const index = () =>{
  return (
    <Fragment>
      <div>
        <div>
          怎么获取这个key，记一手
        </div>
        <img src={require('@/assets/instructions01.png')}/>
      </div>
      <div>
        <div>1. </div>
        <img src={require('@/assets/instructions02.png')}/>
      </div>
      <div>
        <div>2.生成 </div>
        <img src={require('@/assets/instructions03.png')}/>
      </div>
      <div>
        <div>3.复制公钥到项目setting的SHH </div>
        <img src={require('@/assets/instructions04.png')}/>
        <img src={require('@/assets/instructions06.png')}/>
      </div>
      <div>
        最后把私钥放到第一个图中
        .0
      </div>
    </Fragment>
  )
};
export default index;
