import { defaultInstance } from '../../app/api';

export const login = (data) => defaultInstance.post('/api/auth', data).then(resp => resp.data);
export const signUp = (data) => defaultInstance.post('/api/sign_up', { user: data }).then(resp => resp.data);
