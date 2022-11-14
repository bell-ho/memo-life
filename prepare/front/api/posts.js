import axios from 'axios';

export const loadPostsAPI = async (lastId) => {
  const { data } = await axios.get(`/posts?lastId=${lastId || 0}`);
  return data;
};

export const loadUserPostsAPI = async (lastId) => {
  const { data } = await axios.get(`/user/${data}/posts?lastId=${lastId || 0}`);
  return data;
};
