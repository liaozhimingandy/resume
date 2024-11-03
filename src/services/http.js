import instance from "./index";

const post = (url, data) => {
    return new Promise((resolve, reject) => {
        instance
            .post(url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const get = (url, data) => {
    return new Promise((resolve, reject) => {
        instance
            .get(url, {params: data})
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};
const put = (url, data) => {
    return new Promise((resolve, reject) => {
        instance
            .put(url, data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const del = (url, data) => {
    return new Promise((resolve, reject) => {
        instance
            .delete(url, {params: data})
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    post,
    get,
    put,
    del,
};


// 示例: 用户登录
// const login = (data) => {
//   return http.post("/index/user/login", data);
// };