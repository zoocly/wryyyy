class MessageBox {
  constructor(options) {
    // 把传递进来的配置信息挂载到实例上（以后可以基于实例在各个方法各个地方拿到这个信息）
    for (let key in options) {
      if (!options.hasOwnProperty(key)) break;
      this[key] = options[key];
    }

    // 开始执行
    this.init();
  }

  // 初始化：通过执行INIT控制逻辑的进行
  init() {
    if (this.status === "message") {
      this.createMessage();
      this.open();
      return;
    }

  }

  // 创建元素
  createMessage() {
    this.messageBox = document.createElement('div');
    if (this.self) {
      this.messageBox.className = `dpn-message dpn-success-self`;
      this.messageBox.innerHTML = `
        <div class="infos">
          <img id="_img" src='' style="height:20px;margin-right: 10px">
          <span>${this.message}</span>
				  <span class="dpn-close"></span>
        </div>
			`;
    } else {
      this.messageBox.className = `dpn-message dpn-${this.type}`;
      this.messageBox.innerHTML = `
        <div class="infos">
          ${this.message}
				  <i class="dpn-close">X</i>
        </div>
			`;
    }

    document.body.appendChild(this.messageBox);
    if (this.self) {
      let src = `${this.type}.png`;
      this.messageBox.getElementsByTagName('img')[0].src = src;
    }

    // 基于事件委托监听关闭按钮的点击
    this.messageBox.onclick = ev => {
      let target = ev.target;
      //判断点击的元素是否为关闭按钮
      if (target.className === "dpn-close") {
        // 点击的是关闭按钮
        this.close();
      }
    };

    // 钩子函数
    this.oninit();
  }

  // 控制显示
  open() {
    if (this.status === "message") {
      let messageBoxs = document.querySelectorAll('.dpn-message'),
        len = messageBoxs.length;
      //计算新弹出的messageBox的Y轴偏移量
      this.messageBox.style.top = `${len === 1 ? 20 : 20 + (len - 1) * 70}px`;

      // 如果duration不为零，控制自动消失
      this.autoTimer = setTimeout(() => {
        this.close();
      }, this.duration);

      // 钩子函数
      this.onopen();
      return;
    }
  }

  // 控制隐藏
  close() {
    if (this.status === "message") {
      clearTimeout(this.autoTimer);
      this.messageBox.style.top = '-200px';
      let anonymous = () => {
        document.body.removeChild(this.messageBox);
        // 钩子函数
        this.onclose();
      };
      this.messageBox.addEventListener('transitionend', anonymous);
      return;
    }

  }
}

//全局对象上挂载该方法
window.messageplugin = function (options = {}) {
  //允许只传入字符串，对其进行对象格式处理
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  //用户提供的配置覆盖默认配置项
  options = Object.assign({
    status: 'message',
    message: '我是默认信息',
    type: 'info',
    duration: 3000,
    self: false,    //false为elementUI样式，ture为antd样式（内置type success 和 err）
    //生命周期钩子
    oninit() {
    },
    onopen() {
    },
    onclose() {
    },
  }, options);
  return new MessageBox(options);
};

let submit1 = document.getElementById("submit1")
let submit2 = document.getElementById("submit2")
let submit3 = document.getElementById("submit3")
let submit4 = document.getElementById("submit4")

// submit1.onclick = function() {
//   messageplugin('我是info');
// };
//
// submit2.onclick = function() {
//   messageplugin({
//     message: "我是success",
//     type: "success"
//   });
// };
//
// submit3.onclick = function() {
//   messageplugin({
//     message: "我是error",
//     type: "error"
//   });
// };
//
// submit4.onclick = function() {
//   messageplugin({
//     message: "我是warning",
//     type: "warning",
//     oninit() { console.log('我被init 了') },
//     onopen() { console.log('我被open 了') },
//     onclose() { console.log('我被close 了') },
//   });
// };
