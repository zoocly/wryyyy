import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import './index.less';
const index = () => {
  const handleClick = () => {
    const wrapper = document.getElementById('wrapper');
    if(!_isEmpty(wrapper)){
      // @ts-ignore
      wrapper.classList.toggle('isNavOpen');
    }
  };

  return (
    <div id={'wrapper'} className={'wrapper'}>
      <div className={'nav'}>
        <span className={'nav-icon'} onClick={handleClick}>图标</span>
        <div className={'navBody'}>
          adasdasdadsadasdsdsdsddsdssssssssssssssssss
        </div>
      </div>
    </div>
  )
};
export default index;
