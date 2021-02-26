import React, { Fragment } from 'react';
const index = () =>{
  return (
    <Fragment>
      <h1>sourceTree 的key</h1>
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
      <h1>gitBatKey 适配webstorm</h1>
      <div>
        {/*https://blog.csdn.net/duansamve/article/details/89343902*/}
        <div>
          1. 在setting中登录 github帐号
        </div>
        <div>
          2. 配置git.exe
        </div>
        <div>
          <br/> 3. ,打开git-bash，在控制台中输入以下命令。
          <br/>$ ssh-keygen -t rsa -C "youremail@example.com"
          <br/> ps : ssh-keygen是产生密钥，密钥有两种类型rsa和dsa两种，-t用来指定密钥类型，-t rsa是将密钥类型指定为rsa，-C是公钥中的备注，xxx 通常指定为自己的邮箱，也可以输入其他。<br/>
          <br/> 首先，在windows下查看[c盘->用户->自己的用户名->.ssh]下是否有id_rsa、id_rsa.pub文件，如果有，取到id_rsa.pub内的key，然后登陆github，进入setting->SSH keys。
        </div>
      </div>
    </Fragment>
  )
};
export default index;
