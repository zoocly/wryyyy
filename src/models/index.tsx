import { listPageModel } from '@/utils/common-model';
import modelExtend from 'dva-model-extend';
import { jsonToTree } from 'src/utils/method.js';
import { getMenu } from 'src/pages/services/login';

const set = modelExtend(listPageModel, {
  namespace: 'login',
  state: {
    menuData: [],
    menuDataTree: [],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        const { pathname, search } = location;

      });
    },
  },
  effects: {
    * getMenu({ payload }, { call, put }) {
      const { code = 500, data = [] } = yield call(getMenu, payload.payload);
      if (code === 0) {
        const menuTree = jsonToTree(data, 'parentCode', 'code', '-1');
        payload.callback('在effect回调来一些信息，比如说判断接口是否成功关掉模态框');
        yield put({
          type: 'updateState',
          payload: {
            menuData: data,
            menuDataTree: menuTree,
          },
        });
      }
    },
  },
});
export default set;
