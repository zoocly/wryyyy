import React, { Fragment, useEffect } from 'react';

const index = () => {
  useEffect(()=>{
    let canvas:any = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    let image = new Image();
    image.src = require('@/assets/dragen.jpg');
    image.onload = function(){
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image,0,0);

      let imageData = ctx.getImageData(0,0,image.width,image.height).data;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0,0,image.width,image.height);

      let gap = 6;

      for (let h = 0; h < image.height; h+=gap) {
        for(let w = 0; w < image.width; w+=gap){
          let position = (image.width * h + w) * 4;
          let r = imageData[position], g = imageData[position + 1], b = imageData[position + 2];

          if(r+g+b==0){
            ctx.fillStyle = "#000";
            ctx.fillRect(w,h,4,4);
          }
        }
      }
    }


  },[]);

  return (
    <Fragment>
      <div>
        <canvas id="canvas" width="200" height="200"/>
      </div>
    </Fragment>
  );
};
export default index;
