import React, { useEffect } from 'react';
import style from './index.less';

const index = () => {
  useEffect(() => {
    let canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    let count = 5, imgCount = 5, imgList = [], yList = [];
    ctx.fillStyle = 'rgba(255,255,255,0.2)';

    for(var x = 0;x < imgCount;x++){
      ctx.clearRect(0,0,canvas.width,canvas.height);//清除画布
      for(var i = 0;i<count;i++){
        var imgX = Math.random() * canvas.width;
        var imgY = Math.random() * canvas.height;

        ctx.beginPath();
        ctx.lineWidth="2";
        ctx.strokeStyle="#cccccc90";
        ctx.moveTo(imgX,imgY);
        ctx.lineTo(imgX,imgY + 10);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#cccccc80";
        ctx.moveTo(imgX,imgY + 10);
        ctx.lineTo(imgX,imgY + 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle="#cccccc60";
        ctx.moveTo(imgX,imgY + 20);
        ctx.lineTo(imgX,imgY + 30);
        ctx.stroke();

        // ctx.beginPath();
        // ctx.moveTo(imgX,imgY);//起点
        // ctx.lineTo(imgX + 3,imgY + 15);//绘制线条
        // var radius = 3;//圆形半径
        // ctx.arc(imgX,imgY + 15,radius,0,180* Math.PI / 180);//绘制一个半圆
        // ctx.closePath();//闭合路径
        ctx.fill();//填充
        var img = new Image();
        img.src = canvas.toDataURL("image/png");//保存图片
      }
      imgList[x] = img;
      yList[x] = canvas.height;
    }
    function dropDown(){
      ctx.clearRect(0,0,canvas.width,canvas.height);//清除画布

      for(var i = 0;i<imgCount;i++){
        yList[i] -= (i + 1.2) * 5;
        if (yList[i] < canvas.height) {
          yList[i] = yList[i] + canvas.height;
        }
        // ctx.drawImage(imgList[i], 0, yList[i]);
        ctx.drawImage(imgList[i], 0, yList[i] - canvas.height);
      }
      window.requestAnimationFrame(dropDown);
      // setTimeout(dropDown,1000/60)
    }
    dropDown();

  }, []);
  return (
    <div className={style.main}>
      <div className={style.bg}>
        <div className={style.top}/>
        <div className={style.leftline}/>
        <div className={style.rightline}/>
        <div className={style.leftline1}/>
        <div className={style.rightline1}/>
      </div>
      <canvas id="canvas" width="200" height="200"/>
    </div>
  );
};
export default index;
