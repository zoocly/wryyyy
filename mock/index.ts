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

  '/api/chart/getDictChartList': (req:any, res:any) => {
    let obj ={"code":0,"message":"操作成功","data":[{"id":24,"key":"1011","name":"专科学历以上情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":25,"key":"1012","name":"工作岗位分布情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":26,"key":"1013","name":"公有制单位所有分类情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":27,"key":"1014","name":"非公有制单位所有分类情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":28,"key":"1015","name":"社会组织所有分类情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":29,"key":"1016","name":"农牧渔民所有分类情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":22,"key":"1008","name":"困难党员","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","default":"1","is_enable":"1"},{"id":23,"key":"1009","name":"多重党员","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","is_enable":"1"},{"id":30,"key":"1010","name":"历史党员","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","is_enable":"1"},{"id":31,"key":"1017","name":"党员年龄分布","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":32,"key":"1018","name":"党员党龄分布","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":33,"key":"1019","name":"党员入党时间分布","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"},{"id":3,"key":"1002","name":"男性比例","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","default":"1","is_enable":"1"},{"id":4,"key":"1003","name":"汉族","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","is_enable":"1"},{"id":1,"key":"1","name":"党员概况","parent":"-1","is_leaf":0,"para_name":"memOverview","is_enable":"1"},{"id":2,"key":"1001","name":"人员总数","method_name":"","parent":"1","is_leaf":1,"type":"card","para_name":"memOverview","is_enable":"1"},{"id":5,"key":"1004","name":"人员详情","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","default":"1","is_enable":"1"},{"id":7,"key":"1006","name":"学历情况","parent":"1","is_leaf":1,"type":"chart","para_name":"memOverview","is_enable":"1"}]};
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },

  '/api/chart/findByChartType' : (req:any, res:any) => {
    let obj = {};
    if(req.query.chartType == 'MemOverview'){
      obj = {"code":0,"message":"操作成功","data":{"memOverview":[{"key":"1001","name":"人员总数"},{"key":"1004","name":"人员详情"}]}};
    }else {
      obj = {"code":0,"message":"操作成功","data":{"memOverview":[{"key":"1001","name":"人员总数"},{"key":"1002","name":"人员总数2"}]}};
    }
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },
  'POST /api/chart/mem/getMemTotal' : (req:any, res:any) => {
    let obj = {"code":0,"message":"操作成功","data":{
      a:1,b:2,c:3
      }};
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },
  'POST /api/chart/mem/getMemTotal2' : (req:any, res:any) => {
    let obj = {"code":0,"message":"操作成功","data":{
        a:1,b:2,c:3
      }};
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },
  'POST /api/chart/saveChart' : (req:any, res:any) => {
  let obj = {"code":0,"message":"操作成功"};
  setTimeout(() => {
    res.send(obj);
  }, 500);
},
};
