import modelExtend from "dva-model-extend";
import {PaginationProps} from "antd/lib/pagination";

export interface ListPageStore<T> {
    list: Array<T>;
    pagination: PaginationProps;
}

const basicModel = {
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        }
    }
};

const listPageModel = modelExtend(basicModel, {
    state: {
        list: [],
        pagination: {
            showSizeChanger: false,
            showQuickJumper: false,
            page: 1,
            total: 0,
            pageSize: 20
        }
    },

    reducers: {
        querySuccess(state, { payload }) {
            const { list, pagination } = payload;
            return {
                ...state,
                list,
                pagination: {
                    ...state.pagination,
                    ...pagination
                }
            };
        }
    }
});

export { basicModel, listPageModel };
