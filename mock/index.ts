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
        {code:'001.004', name:'才哥哥直播脱衣', parentCode:'001', icon:'user', color:'',url:'/but/video'},

        {code:'002', name:'这样的男人', parentCode:'-1', icon:'user', color:''},
        {code:'002.001', name:'render渲染', parentCode:'002', icon:'user', color:'',url:'/thisMan/recatRender'},
        {code:'002.002', name:'牌子', parentCode:'002', icon:'user', color:'',url:'/thisMan/paizi'},
        {code:'002.003', name:'抽奖', parentCode:'002', icon:'user', color:'',url:'/thisMan/lottery'},
        {code:'002.004', name:'umi的hook？', parentCode:'002', icon:'user', color:'',url:'/thisMan/umiHook'},
        {code:'002.005', name:'练习写table表', parentCode:'002', icon:'user', color:'',url:'/thisMan/textTable'},

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

  'POST /api/case/list' : (req:any, res:any) => {
    let obj = {"code":0,"message":"操作成功","data":{"records":[{"id":58,"code":"c251371e-e336-4564-9e3e-52a1a153c99a","caseNum":"2019015","name":"刚发的","orgCode":"48749904-1bb7-4cb1-9e46-68ffd7d5c605","leader":"地方","caseMoney":"300.00","phone":"17781051196","remark":"32 ","createTime":"2019-12-24 17:13:28","orgName":"测试单位3","currencyCode":"001"},{"id":57,"code":"8a3a819c-ef65-4205-905d-12093800512a","caseNum":"2019014","name":"时间测试","orgCode":"48749904-1bb7-4cb1-9e46-68ffd7d5c605","leader":"测试啊","caseMoney":"2,000.00","phone":"123","remark":"123","createTime":"2019-12-24 14:55:46","orgName":"测试单位3","currencyCode":"001"},{"id":55,"code":"c8aa8065-5fd7-4d71-84ed-f5bd2e0df1fb","caseNum":"2019012","name":"用户管理123","orgCode":"b2790483-f197-4355-af41-8696024b75ee","leader":"1123123123","caseMoney":"1,222,222,222,222.00","phone":"111111","remark":"123123123","createTime":"2019-12-23 17:08:34","orgName":"测试单位2","currencyCode":"038"},{"id":54,"code":"afc6976a-276f-40d6-ae46-52cf89761032","caseNum":"2019011","name":"用户管理12","orgCode":"48749904-1bb7-4cb1-9e46-68ffd7d5c605","leader":"11111","caseMoney":"12,123.00","phone":"123123","remark":"13123123","createTime":"2019-12-23 17:08:19","orgName":"测试单位3","currencyCode":"012"},{"id":53,"code":"8f168e57-4304-4133-9aba-4054edf7c7eb","caseNum":"2019010","name":"用户管理111","orgCode":"7f3c4a58-ffa3-49fb-83d8-a06949cd3028","leader":"1111","caseMoney":"11,111.00","phone":"1111","remark":"1111","createTime":"2019-12-23 17:08:03","orgName":"测试单位","currencyCode":"001"},{"id":52,"code":"62623fe8-667b-420f-99cb-ad022cc98591","caseNum":"2019009","name":"hhl测试","orgCode":"001","leader":"纪委","caseMoney":"600,000.00","phone":"777777777","createTime":"2019-12-23 17:07:54","orgName":"重庆市纪委","currencyCode":"013"},{"id":51,"code":"f9e41b00-1111-4b14-8898-5408f4ac66da","caseNum":"2019008","name":"csaaaa","orgCode":"7f3c4a58-ffa3-49fb-83d8-a06949cd3028","leader":"123","caseMoney":"1,231.00","phone":"12312312312","createTime":"2019-12-23 16:55:23","updateTime":"2019-12-25 10:15:16","orgName":"测试单位","currencyCode":"001"},{"id":50,"code":"a5cd5be1-6db2-4961-8849-db28a6d87a57","caseNum":"2019007","name":"用户管理111","orgCode":"48749904-1bb7-4cb1-9e46-68ffd7d5c605","leader":"1111","caseMoney":"11,111.00","phone":"111111","createTime":"2019-12-23 16:41:15","updateTime":"2019-12-23 16:51:50","orgName":"测试单位3","currencyCode":"038"},{"id":48,"code":"aaaabc55-1247-4375-8ce1-b845601deb51","caseNum":"2019005","name":"用户管理","orgCode":"7f3c4a58-ffa3-49fb-83d8-a06949cd3028","leader":"123456","caseMoney":"100,000.00","phone":"123123123","createTime":"2019-12-23 16:17:28","updateTime":"2019-12-25 10:15:02","orgName":"测试单位","currencyCode":"001"},{"id":47,"code":"021aeacb-6977-4363-bf1c-586536a179b5","caseNum":"2019004","name":"admin","orgCode":"48749904-1bb7-4cb1-9e46-68ffd7d5c605","leader":"测试","caseMoney":"2,000.00","phone":"123","remark":"按时","createTime":"2019-12-23 15:51:05","orgName":"测试单位3"}],"total":13,"size":10,"current":1,"searchCount":true,"pages":2}};
    setTimeout(() => {
      res.send(obj);
    }, 500);
  },

};
