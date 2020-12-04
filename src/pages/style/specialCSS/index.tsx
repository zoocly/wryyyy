import React from 'react';
import {Divider} from 'antd';
import './index.less';
import Clock from '@/components/LJClock';
import { AlipayCircleOutlined } from '@ant-design/icons';


const index = () => {
  const onClick = () =>{
    console.log('点击了，如果有特殊要求，需要hover后点击的，要加上visibility: visible;visibility: hidden;');
  };
  return (
    <div>
      <Divider orientation={'left'}>悬浮特效2</Divider>
      <div className='hover2'>
        <div>
          <div className='tit'>
            123
          </div>
          <div className='info'>
            3456
          </div>
        </div>
      </div>
      <Divider orientation={'left'}>3D卡片</Divider>
      <div className='card3DBox'>
        <div className='card3D'>
          <div className='imgs'>
            <AlipayCircleOutlined style={{fontSize:'60px',color:'white'}}/>
            <div className='tit'>标题</div>
          </div>
          <div className='main'>
            <div>
              这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
            </div>
          </div>
        </div>
        <div className='shadow'/>
      </div>
      <Divider orientation={'left'}>钟</Divider>
      <Clock/>
      <div id="container">
        <div id="div1"/>
        <div id="div2" onClick={onClick}/>
      </div>
      <pre>
        {`
        animation（动画）
        用于设置动画属性，他是一个简写的属性，包含6个属性
          name:用来调用@keyframes定义好的动画，与@keyframes定义的动画名称一致
          duration:指定元素播放动画所持续的时间
          timing-function:规定速度效果的速度曲线，是针对每一个小动画所在时间范围的变换速率
          delay:定义在浏览器开始执行动画之前等待的时间，值整个animation执行之前等待的时间
          iteration-count:定义动画的播放次数，可选具体次数或者无限(infinite)
          direction:设置动画播放方向：
            normal(按时间轴顺序),
            reverse(时间轴反方向运行),
            alternate(轮流，即来回往复进行),
            alternate-reverse(动画先反运行再正方向运行，并持续交替运行)
          play-state:控制元素动画的播放状态，通过此来控制动画的暂停和继续，两个值：
            running(继续)，paused(暂停)
          fill-mode:控制动画结束后，元素的样式，有四个值：
            none(回到动画没开始时的状态)，
            forwards(动画结束后动画停留在结束状态)，
            backwords(动画回到第一帧的状态)，
            both(根据animation-direction轮流应用forwards和backwards规则)，
            注意与iteration-count不要冲突(动画执行无限次)

        transition（过渡）
        用于设置元素的样式过度，和animation有着类似的效果，但细节上有很大的不同
          transition-property:规定设置过渡效果的 CSS 属性的名称
          transition-duration:规定完成过渡效果需要多少秒或毫秒
          transition-timing-function:规定速度效果的速度曲线
          transition-delay:定义过渡效果何时开始

        transform（变形）
        用于元素进行旋转、缩放、移动或倾斜，和设置样式的动画并没有什么关系，就相当于color一样用来设置元素的“外表”
        rotate(旋转),scale(缩放),skew(扭曲),translate(移动)和matrix(矩阵变换)
        `}
      </pre>
      <div>
        说人话<br/>
        animation 动画~关键帧，往复性。<br/>
        transition 过渡~ 属性，触发动作，一过性。<br/>
        transform 变换~ 复杂的变换参数。<br/>
      </div>
      <Divider orientation={'left'}>悬浮菜单</Divider>
      <div className='menu'>
        <div className='main'>
          <div data-text='services' className='item'><div>撒旦</div></div>
          <div data-text='animationPage' className='item'><div>三顿饭</div></div>
          <div data-text='Iterate' className='item'><div>请问</div></div>
          <div data-text='learnTS' className='item'><div>润喉糖</div></div>
          <div data-text='normalJS' className='item'><div>蔡万才</div></div>
        </div>
      </div>

      <Divider orientation={'left'}>波浪文本</Divider>
      <div className='wave'>
        <span style={{ '--i': 1 }}>1</span>
        <span style={{ '--i': 2.5 }}>2</span>
        <span style={{ '--i': 3 }}>3</span>
        <span style={{ '--i': 4.5 }}>4</span>
        <span style={{ '--i': 5 }}>5</span>
        <span style={{ '--i': 6.5 }}>6</span>
        <span style={{ '--i': 7 }}>7</span>
        <span style={{ '--i': 8.5 }}>8</span>
      </div>

      <Divider orientation={'left'}>涟漪动画</Divider>
      <div className='wave2'>
        <span style={{ '--i': 1 }}/>
        <span style={{ '--i': 1.5 }}/>
        <span style={{ '--i': 2 }}/>
        <span style={{ '--i': 2.5 }}/>
        <span style={{ '--i': 3 }}/>
      </div>

      <Divider orientation={'left'}>悬浮特效</Divider>
      <div className='hover'>
        <div className='fix'>
          <img src={require('@/assets/img1.png')} />
        </div>
        <div className='bg'>
          <div className='main'>
            <h1>这是标题</h1>
            <p>
              这是内容这是内容这是内容这是内容
              这是内容这是内容这是内容这是内容
              这是内容这是内容这是内容这是内容
              这是内容这是内容这是内容这是内容
            </p>
          </div>
        </div>
      </div>

      <Divider orientation={'left'}>卡片特效</Divider>
      <div className='card'>
        <div className='imgs'>
          <img src={require('@/assets/img1.png')}/>
        </div>
        <div className='main'>
          <h1>这是一双鞋</h1>
          <div className='size' style={{'--i': 1,'--a':3}}>
            SIZE:
            <span>7</span>
            <span>8</span>
            <span>6</span>
            <span>5</span>
          </div>
          <div className='color' style={{'--i': 2,'--a':2}}>
            <span>红</span>
            <span>黄</span>
            <span>绿</span>
          </div>
          <a style={{'--i': 3,'--a':1}}>立即购买</a>
        </div>
      </div>
    </div>
  );
};
export default index;
