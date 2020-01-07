import React, {Fragment, PureComponent} from 'react';
import {Avatar, Card, Tooltip} from 'antd';
import CountUp from 'react-countup';
import style from './index.less';

interface Interface {
  src?:string,
  iconColor:string,
  title:string,
  end:number,
  icon?:string,
  tooltipTitle?:string,
  prefix?:string,
  suffix?:string,
  subtitle?:object,
  bordered?:boolean ,
  bodyStyle?:object,
  tooltipPlacement?:string,
  duration?:number,
  separator?:string,
  decimals?:number,
  decimal?:string,
  onClick?:()=>void
  children:any
}
export default function index (props:Interface) {
  const {
    icon = 'smile',
    tooltipTitle = '',
    iconColor = '#ccc',
    title = '暂无标题',
    end = 0,
    prefix = '',
    suffix = '',
    bordered = true,
    bodyStyle = {},
    duration = 2,
    separator = ',',
    decimals = 0,
    decimal = '.',
    children,
    onClick = () => {console.log('没有点击事件');},
    src = ''
  } =props;
  return (
    <div className={style.noPaddingCard}>
      <div className={style.card}>
        <div className={style.cardFlex}>
          <div className={style.cardCell}>

            <div className={style.icon}>
              <Tooltip
                title={tooltipTitle}
              >
                {
                  src ?
                    <div className={style.imgBox} style={{background:`${iconColor}`}}>
                      <img src={src} className={style.img}/>
                    </div>
                    :
                    <Avatar size={64} icon={icon} style={{backgroundColor:`${iconColor}`}}/>
                }
              </Tooltip>
            </div>

            <div className={style.info}>
              <div className={style.words}>{title}</div>
              <div className={style.countUpNmber}>
                {
                  !isNaN(end) ?
                    <div onClick={onClick}>
                      <CountUp
                        className="custom-count"
                        start={0}
                        end={end}
                        duration={duration}
                        separator={separator}
                        decimals={decimals}
                        decimal={decimal}
                        prefix={prefix}
                        suffix={suffix}
                      />
                    </div> :
                    <Fragment>0</Fragment>
                }
              </div>
              <div style={{marginBottom:'10px'}}>
                {children}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
