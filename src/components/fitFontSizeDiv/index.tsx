import React, { useEffect } from 'react';

const index = (props: any) => {
  const {
    text = '',
    maxHeight = '0px',
  } = props;
  useEffect(() => {
    const el: any = document.getElementById('fontDiv');
    const { clientHeight } = el;
    if (clientHeight > 0) {
      let fontsize = parseFloat(window.getComputedStyle(el, null).getPropertyValue('font-size'));
      console.log(clientHeight, maxHeight);
      // while (clientHeight < maxHeight) {
      //   console.log(12345)
      //   el.style.fontSize = `${fontsize++}px`;
      // }
    }
  }, [JSON.stringify(text)]);
  const changeSize = (el: any) => {

  };
  return (
    <div style={{ height: `${maxHeight}px` }}>
      <div id='fontDiv'>
        {text}
      </div>
    </div>
  );
};
export default index;
