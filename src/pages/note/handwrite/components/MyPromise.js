const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

export default class MyPromise {

  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  status = PENDING;
  value = null;
  reason = null;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];


  resolve = (val) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = val;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(val);
      }
    }
  };
  reject = (val) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = val;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(val);
      }
    }
  };

  then(onFulfilled, onRejected) {
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === REJECTED) {
        // ==== 新增 ====
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.status === PENDING) {
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
      }
    })
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  if (x instanceof MyPromise) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
    }
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
