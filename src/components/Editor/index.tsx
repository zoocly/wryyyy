import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import _replace from 'lodash/replace';
// @ts-ignore
import E from 'wangeditor';
import style from './index.less';
// @ts-ignore
import Editor from "wangeditor";
import {ResType} from "wangeditor/dist/menus/img/upload-img";

interface Interface {
  id:string,
  onChange?:(val:any)=>void,
  init?:any,
  disabled?:boolean,
  uploadImgServer?:string
}
export default class index extends React.Component<Interface, any> {
  constructor(props:any) {
    super(props);
    this.state = {

    }
  }
  componentDidMount(): void {
    const {id = '', onChange, init,disabled=false, uploadImgServer = ''} = this.props;
    if(!_isEmpty(id)){
      let editor = new E(`#${id}`);

      editor.config.onchange = (html:any) => { // 使用 onchange 函数监听内容的变化
        onChange && onChange(html)
      };
      editor.config.uploadImgMaxLength = 20; // 限制一次最多上传 20 张图片
      // editor.config.uploadImgServer = uploadImgServer; //图片上传地址
      editor.config.uploadImgShowBase64 = true;   // 使用 base64 保存图片
      editor.config.uploadImgMaxSize = 2 * 1024 * 1024;//将图片大小限制为 2M
      editor.config.showLinkImg = false; // 隐藏“网络图片”tab
      editor.config.menus = [
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        // 'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        // 'emoticon', // 表情
        'image', // 插入图片
        // 'table', // 表格
        // 'video', // 插入视频
        // 'code', // 插入代码
        // 'undo', // 撤销
        // 'redo' // 重复
      ];
      editor.config.uploadImgHeaders = {
        'Authorization': sessionStorage.getItem('authorization') || ""
      };
      editor.config.uploadImgHooks = {
        before: function (xhr:XMLHttpRequest, editor:Editor, files:File[]) {
          // 图片上传之前触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

          // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
          // return {
          //     prevent: true,
          //     msg: '放弃上传'
          // }
        },
        success: function (xhr:XMLHttpRequest, editor:Editor, result:ResType) {
          // 图片上传并返回结果，图片插入成功之后触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr:XMLHttpRequest, editor:Editor, result:ResType|string) {
          // 图片上传并返回结果，但图片插入错误时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr:XMLHttpRequest, editor:Editor) {
          // 图片上传出错时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr:XMLHttpRequest, editor:Editor) {
          // 图片上传超时时触发
          // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },

        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg:any, result:ResType, editor:Editor) {
          // const { code = 500 ,data = []} = result || {};
          // if(code === 0 && !_isEmpty(data)){
          //   data.map(item=>{
          //     insertImg('/api'+item.url)
          //   })
          // }
          // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
          // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

          // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
          // @ts-ignore
          var url = result.url;
          insertImg(url)

          // result 必须是一个 JSON 格式字符串！！！否则报错
        }
      }; // 图片上传回调
      editor.config.uploadImgTimeout = 50000; // 图片上传时间限制
      editor.create();
      editor.$textElem.attr('contenteditable', !disabled);
      if(disabled){
        editor.$textElem.attr('style', 'width:100%; height:100%; background:#f5f5f5; color:rgba(0,0,0,.25)');
      }
      editor.txt.html(init);
      // this.setState({
      //   editor
      // })
    }
  }
  // static getDerivedStateFromProps = (nextProps:any, prevState:any) => {
  //   const state = [];
  //   const {init} = nextProps;
  //   const {_init,editor} = prevState;
  //   if(!_isEqual(init,_init)){
  //     console.log(init,'init');
  //     console.log(editor,'editor');
  //     state['_init'] = init;
  //     if(!_isEmpty(editor)){
  //       console.log(init,'init');
  //       editor.txt.html(init);
  //     }
  //   }
  //   return state;
  // };
  render(): React.ReactNode {
    const {id = ''} = this.props;
    return (
      <div id={id} className={style.box}/>
    )
  }
}
