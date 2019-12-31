export function createXHR() {
  // new一个XMLHttpRequest实例
  let xhr = new XMLHttpRequest();
  // 第一步使用open方法，接收三个参数
  // 第一个参数是请求方法名（get，post等）
  // 第二个参数是需要请求的接口地址
  // 第三个参数是设置请求是否是异步，一般都是都是发送异步请求，同步请求可能会阻塞页面
  // 我们先来看同步请求
  xhr.open('get', '/api/users/1?pageNum=1&pageSize=20', true);
  xhr.onreadystatechange = function (){
    if (xhr.readyState === 4 ) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
        console.log(xhr,'xhr');
        // 输出数据。responseText是作为响应主体被返回的文本
        console.log(JSON.parse(xhr.responseText),'xhr.responseText')
      } else {
        alert('请求不成功')
      }
    }
  };
  // open方法只是设置参数，并不会发送请求
  // 而请求是由send()方法发送的，并且接收一个参数，就是需要发送到服务端的数据
  // 如果没有需要发送到服务端的数据，必须传入null，因为有些浏览器不许要这个参数
  xhr.send(null)
}
export function transformData(data:any) {
  let newData = [];
  for (let key in data) {
    newData.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
  }
  return newData.join('&')
}
export function createPostXHR() {
  let xhr = new XMLHttpRequest();
  let data = {
    a:1,
    b:2,
  };
  xhr.open('post', '/api/getMenu', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 ) {
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304 ) {
        console.log(xhr.responseText,'xhr.responseText')
      } else {
        alert('请求不成功')
      }
    }
  };
  // 模仿表单提交，设置content-type，我们需要重新设置请求头，让服务端能知道我们传的是个什么数据
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  // send()方法需要传入的数据应该经过处理
  xhr.send(transformData(data))
}
