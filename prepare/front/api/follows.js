import axios from 'axios';
import { backUrl } from '~/config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadFollowingsAPI = async (page) => {
  const { data } = await axios.get(`/user/followings?page=${page}`);
  return data;
};

export const loadFollowersAPI = async (page) => {
  const { data } = await axios.get(`/user/followers?page=${page}`);
  return data;
};

export const unfollowAPI = async (params) => {
  const { data } = await axios.delete(`/user/${params}/follow`);
  return data;
};

export const followAPI = async (params) => {
  const { data } = await axios.patch(`/user/${params}/follow`);
  return data;
};

export const removeFollowerAPI = async (params) => {
  const { data } = await axios.delete(`/user/follower/${params}`);
  return data;
};
