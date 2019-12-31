export class ApiError extends Error {
    constructor(message, url) {
        super(message);
        this.message = message;
        this.name = "ApiError";
        this.url = url;

        this.constructor = ApiError;
        this.__proto__ = ApiError.prototype;
    }
}
export class ApiTimeoutError extends ApiError {
    constructor(time, url) {
        super("请求超时", url);
        this.name = "ApiTimeoutError";
        this.time = time;

        this.constructor = ApiTimeoutError;
        this.__proto__ = ApiTimeoutError.prototype;
    }
}
export class ApiServerError extends ApiError {
    constructor(statusCode, url) {
        super(`请求服务器出错：${statusCode}`, url);
        this.name = "ApiServerError";
        this.constructor = ApiServerError;
        this.__proto__ = ApiServerError.prototype;
    }
}
export class ApiModuleError extends ApiError {
    constructor(statusCode, url) {
        super(`模块服务不可用：${statusCode}`, url);
        this.name = "ApiModuleError";
        this.constructor = ApiModuleError;
        this.__proto__ = ApiModuleError.prototype;
    }
}

export class ApiAuthError extends ApiError {
    constructor(url) {
        super("登录已过期", url);
        this.name = "ApiAuthError";
        this.constructor = ApiAuthError;
        this.__proto__ = ApiAuthError.prototype;
    }
}

export class ApiJsonError extends ApiError {
    constructor(url) {
        super(`请求服务器出错：无法转换为JSON 或 API 路径错误`, url);
        this.name = "ApiJsonError";
        this.constructor = ApiJsonError;
        this.__proto__ = ApiJsonError.prototype;
    }
}

export class ApiBusinessError extends ApiError {
    constructor(message, url, response) {
        super(message, url);
        this.name = "ApiBusinessError";
        this.constructor = ApiBusinessError;
        this.__proto__ = ApiBusinessError.prototype;
        this.response = response;
    }
}
