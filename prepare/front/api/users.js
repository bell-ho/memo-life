import axios from 'axios';
import { backUrl } from '~/config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadMyInfoAPI = async () => {
  const { data } = await axios.get('/user');
  return data;
};

export const loadUserAPI = async (params) => {
  const { data } = await axios.get(`/user/${params}`);
  return data;
};

export const signUpAPI = async (params) => {
  const { data } = await axios.post('/user', params);
  return data;
};

export const logInAPI = async (params) => {
  const { data } = await axios.post('/user/login', params);
  return data;
};

export const logOutAPI = async () => {
  const { data } = await axios.post('/user/logout');
  return data;
};

export const changeNicknameAPI = async (params) => {
  const { data } = await axios.patch('/user/nickname', { nickname: params });
  return data;
};
