import axios from 'axios';
import { backUrl } from '~/config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const loadPostsAPI = async (lastId) => {
  const { data } = await axios.get(`/posts?lastId=${lastId || 0}`);
  return data;
};

export const loadPostAPI = async (params) => {
  const { data } = await axios.get(`/post/${params}`);
  return data;
};

export const loadHashtagPostsAPI = async (params, lastId) => {
  const { data } = await axios.get(
    `/hashtag/${encodeURIComponent(params)}?lastId=${lastId || 0}`,
  );
  return data;
};

export const loadUserPostsAPI = async (lastId) => {
  const { data } = await axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
  return data;
};

export const likePostAPI = async (params) => {
  const { data } = await axios.patch(`/post/${params}/like`);
  return data;
};

export const unlikePostAPI = async (params) => {
  const { data } = await axios.delete(`/post/${params}/like`);
  return data;
};

export const updatePostAPI = async (params) => {
  const { data } = await axios.patch(`/post/${params.PostId}`, data);
  return data;
};

export const removePostAPI = async (params) => {
  const { data } = await axios.delete(`/post/${params}`);
  return data;
};

export const retweetAPI = async (params) => {
  const { data } = await axios.post(`/post/${params}/retweet`);
  return data;
};

export const addPostAPI = async (params) => {
  const { data } = await axios.post('/post', params);
  return data;
};

export const uploadImagesAPI = async (params) => {
  const { data } = await axios.post('/post/images', params);
  return data;
};
