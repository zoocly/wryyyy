import React, {useRef, useState} from 'react';
import styles from './index.less';
export default function index() {
  const boxRef = useRef();
  const [ isShow, setIsShow ] = useState(0);
  const onClick = () =>{
    if(isShow === 0){
      setIsShow(1);
    }else if(isShow === 1) {
      setIsShow(2);
    }else if(isShow === 2) {
      setIsShow(1);
    }
  };
  return (
    <div>
      <video src="rtmp://58.200.131.2:1935/livetv/cctv1"
             width="100%"
             height="240px"  /*如果有封面，请设置高度*/
             preload="auto" /*这个属性规定页面加载完成后载入视频*/
             controls /* 显示播放器控件 */
             // style="object-fit:cover/fill"
             // playsinline="true"  /*IOS微信浏览器支持小窗内播放*/
             // webkit-playsinline="true"  /*这个属性是ios 10中设置可以让视频在小窗内播放，也就是不是全屏播放*/
             // x5-video-player-type="h5-page" /*启用X5内核同层渲染*/
             // x5-video-orientation="h5" /*播放器支付的方向，landscape横屏，portraint竖屏，默认值为竖屏*/
             // x5-video-player-fullscreen="true" /*全屏设置，设置为 true 是防止横屏*/
             // x5-playsinline="true"   /*设置X5内核为行内播放模式，不能和`x5-video-player-type同时设置会覆盖*/
             // x-webkit-airplay="true"  /*未知*/
             // x5-video-ignore-metadata="true" /*未知*/
      >
        your browser does not support the video tag
      </video>

      <div className={`${styles.box} ${isShow === 1 && styles.open} ${isShow === 2 && styles.hid}`} ref={boxRef}>
        <div style={{width:100,wordBreak:'break-all'}}>
          12333333423424
        </div>
        <button onClick={onClick} className={styles.btn}>move</button>
      </div>
    </div>
  )
}
