import React, { Fragment, useState } from 'react';
import style from './index.less';
import Btns from '../../components/showFloorBtn';
export default function index(props:any) {
  const { floor } = props;
  const [ leftStep, setLeftStep] = useState(1);
  const [ rightStep, setRightStep ] = useState(2);
  const [ animationStyle, setAnimationStyle ] = useState({animation:'ball-run',animationDuration:'2s',animationIterationCount:1,animationFillMode:'forwards'});

  const animation = (from:any, to:any) =>{
    const runkeyframes =`@keyframes ball-run{0%{top: ${from}px;}100%{top: ${to}px;}}`;
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'add-style-id';
    style.innerHTML = runkeyframes;
    document.getElementsByTagName('head')[0].appendChild(style);
    setTimeout(function() {
      // @ts-ignore
      document.getElementsByTagName('head')[0].removeChild(document.getElementById('add-style-id'))
    },(from-to)/100*1000)
  };
  const onUp = (steps:number, direction:string) =>{
    let from = 600-leftStep*100;
    let to = 600-steps*100;
    // if(from > to){
      setAnimationStyle(e=>{ return {...e,animationDuration:`${(from-to)/100}s`} });
      setLeftStep(steps);
      animation(from,to);
    // }
  };

  const renderFloor = (direction:string, nums:number, nowStep:number) =>{
    return (
      <Fragment>
        {
          new Array(nums).fill('').map((it,index)=>{
            return (
              <div key={index} className={style.house}>
                <div className={style.btns} style={{left: direction === 'left' ?  -70 : 310 }}>
                  <Btns nowStep={nowStep} toUp={()=>onUp(index+1,direction)}/>
                </div>
              </div>
            );
          }).reverse()
        }
      </Fragment>
    )
  };
  return (
    <Fragment>
      <div className={style.page}>
        <div id={'leftLift'} className={`${style.leftLift}`} style={{bottom: (leftStep - 1) * 100 - 600,...animationStyle }}/>
        <div className={style.rightLift} style={{bottom: -floor * 100}}/>
        <div className={style.main} style={{height: floor * 100}}>
          <div className={style.left}>
            {renderFloor('left',floor,leftStep)}
          </div>
          <div className={style.right}>
            {renderFloor('right',floor,rightStep)}
          </div>
        </div>
      </div>
    </Fragment>
  )
}
