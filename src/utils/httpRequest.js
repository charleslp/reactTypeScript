import axios from "axios";
import qs from "qs";
import { isPlainObject } from "lodash/lang";
 function getCookie(c_name){
  if (document.cookie.length>0){
      let c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1){
          c_start=c_start + c_name.length+1;
          let c_end=document.cookie.indexOf(";",c_start);
          if (c_end==-1){ 
              c_end=document.cookie.length;
          }

          return unescape(document.cookie.substring(c_start,c_end));
      }
   }

  return "";
}


const instance = axios.create({
  baseURL: 'https://zy-api.gymooit.cn/v1/cms/',
  timeout: 15000,
  withCredentials: false,
  headers: {
    'X-Access-Token': getCookie('token'),
  },
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
// instance.interceptors.response.use(response => {
//   console.log(response,'--response');
//   // if (response.status == -999) {
//   //   window.location.href = '/login';
//   //   return;
//   // }
// }, error => {
//   return Promise.reject(error);
// })
instance.interceptors.response.use(response => {
  // let token = "sdasdadsadasdadasda";
  //   if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
  //       config.headers.Authorization = token;
  //       console.log('interceptors config=',config)
  //   }
  //   return config
  switch(response.status){
    case 401:
      window.location.href = '/login'
      break;
    case 500:
      window.location.href = '/500'
      break;
    case 502:
      window.location.href = '/502'
      break;
    case 503:
      window.location.href = '/503'
      break;
    default:
      return response;
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
