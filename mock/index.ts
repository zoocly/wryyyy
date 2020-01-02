export default {
  // 支持值为 Object 和 Array
  'GET /api/users': {
    code:0,
    data:{
      msg:'成功'
    }
  },
  'GET /api/awsl':  (req:any, res:any) => {
    let obj = {
      code:0,
      data:{
        a:2,b:4
      }
    };
   res.send(obj);
  },

  // GET POST 可省略
  '/api/users/1': { id: 1 },

  // 支持自定义函数，API 参考 express@4
  'POST /api/getMenu': (req:any, res:any) => {
    let obj = {
      code:0,
      data:[
        {code:'001', name:'可是朱云', parentCode:'-1', icon:'user', color:''},
        {code:'001.001', name:'明', parentCode:'001', icon:'user', color:'',url:'/but/home'},
        {code:'001.002', name:'白', parentCode:'001', icon:'user', color:'',url:'/but/login'},
        {code:'001.003', name:'context传值', parentCode:'001', icon:'user', color:'',url:'/but/propsContext'},

        {code:'002', name:'这样的男人', parentCode:'-1', icon:'user', color:''},
        {code:'002.001', name:'render渲染', parentCode:'002', icon:'user', color:'',url:'/thisMan/recatRender'},
        {code:'002.002', name:'牌子', parentCode:'002', icon:'user', color:'',url:'/thisMan/paizi'},
        {code:'002.003', name:'抽奖', parentCode:'002', icon:'user', color:'',url:'/thisMan/lottery'},

        {code:'003', name:'虽不浪漫', parentCode:'-1', icon:'user', color:''},
        {code:'003.001', name:'没毛得起来的毛玻璃', parentCode:'003', icon:'user', color:'',url:'/style/text1'},
        {code:'003.002', name:'多行居左一行居中', parentCode:'003', icon:'user', color:'',url:'/style/text2'},

      ]
    };
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },
};
