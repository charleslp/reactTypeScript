import Axios from "../utils/httpRequest";
export const getMenuList = (params) => Axios.get("AdminAuthMenu", params);
// 修改来源店铺
export const updateStore = (params) => Axios.post(`${Constants.USER_WEB_API}genericOrigin/update`, params);


