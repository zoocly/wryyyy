import React from 'react';
import { Divider } from 'antd';
const index = () =>{
  return (
    <div>
      <Divider orientation={'left'}>地址栏输入url 发生了什么</Divider>
      1.根据url解析，通过DNS查找ip<br/>
      2.根据ip找到服务器，浏览器和服务器会进行 TCP 三次握手建立连接（知识点1），https 和 http 连接还是区别（知识点2）<br/>
      3.建立联系之后，会判断是否走缓存（知识点3），获取文件<br/>
      4.获取html，建立DOM树 (这个过程是边下载边解析，并不是等 html 文件全部下载完了，再去解析 html)<br/>
      &nbsp;&nbsp;解析html头（css放在头，js放在尾，js加载会影响DOM生成速度且若有修改DOM的操作会报错）发现css，也是一边下载一边解析的，建立CSSOM树<br/>
      &nbsp;&nbsp;DOM 树和 CSSOM 树会一起构建成渲染树 （构建布局树，样式计算完之后就开始构建布局树。构建分层树 比如解析z-index）<br/>
      &nbsp;&nbsp;最后渲染页面,解析js文件<br/>

      知识点3 缓存：<br/>
      协商缓存：与服务器协商（看请求头/响应头的设置）是请求服务器还是直接使用缓存，<br/>
      文件第一次请求，服务器响应头会带最后修改日期 Last-Modified<br/>
      第二次请求，请求头会带 if-Modified-Since ，值就是 Last-Modified的值，然后服务器判断是否需要更新文件<br/>
      因为会存在1s内修改很多次的情况，所以还需要配合 Etag/If-None-Match 来精确判断。<br/>
      强制缓存：直接走缓存（cache-control的属性影响缓存文件是否过期）<br/>

      知识点2:(1)服务器和客户端连接的差异 (2)https的加密协议--{'>'} 对称加密 非对称加密 证书<br/>


      Object.defineProperty()为vue响应式的核心。
    </div>
  )
};
export default index;
