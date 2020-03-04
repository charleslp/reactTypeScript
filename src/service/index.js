import Axios from "../utils/httpRequest";
export const getMenuList = (params) => Axios.get("AdminAuthMenu", params);
// 修改来源店铺
export const login = (params) => Axios.post('Login', params);


