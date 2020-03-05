import Axios from "../utils/httpRequest";
// 获取菜单列表
export const getMenuList = (params) => Axios.get("AdminAuthMenu", params);
// 登录
export const login = (params) => Axios.post('Login', params);
// 新增菜单
export const addMenu = (params) => Axios.post('AdminAuthMenu', params);
// 上级菜单下拉框列表
export const selectMenuList = () => Axios.post('AdminAuthMenu/selectList');
// 删除菜单
export const deleteMenu = () => Axios.post('AdminAuthMenu');

