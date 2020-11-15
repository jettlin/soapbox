import Cookies from 'js-cookie';

export const getToken = (state) => state.login?.token || Cookies.get('jwt');
export const getRole = (state) => state.login?.role || Cookies.get('role');
export const getLoading = (state) => state.login?.loading;
