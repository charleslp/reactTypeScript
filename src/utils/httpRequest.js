import axios from "axios";
import qs from "qs";
import { isPlainObject } from "lodash/lang";

const instance = axios.create({
  baseURL: 'https://zy-api.gymooit.cn/v1/cms/',
  timeout: 15000,
  withCredentials: true,
  transformRequest: [
    (data) => {
      // 对 data 进行任意转换处理
      if (isPlainObject(data)) data = qs.stringify(data);
      return data;
    }
  ]
});

// 添加请求拦截器
// instance.interceptors.request.use(config => {
//   return config;
// }, error => {
//   return Promise.reject(error);
// })

// 添加响应拦截器
instance.interceptors.response.use(response => {
  if (response.data.status == -999) {
    window.location.href = '/login';
    return;
  }
}, error => {
  return Promise.reject(error);
})

class Http {
  setBaseURL(url) {
    instance.defaults.baseURL = url;
  }
  get(url, params) {
    return instance.get(url, { params: { ...params } });
  }
  post(url, params, processCallback = {},config) {
    instance.defaults.onUploadProgress = processCallback;
    return instance.post(url, params, config);
  }

}
const Axios = new Http();

export default Axios
