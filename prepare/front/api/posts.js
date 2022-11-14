import axios from 'axios';

export const loadPostsAPI = async (lastId) => {
  const { data } = await axios.get(`/posts?lastId=${lastId || 0}`);
  return data;
};
