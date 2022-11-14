import axios from 'axios';

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
