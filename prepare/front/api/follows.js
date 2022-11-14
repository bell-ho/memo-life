import axios from 'axios';

export const loadFollowingsAPI = async (page) => {
  const { data } = await axios.get(`/user/followings?page=${page}`);
  return data;
};

export const loadFollowersAPI = async (page) => {
  const { data } = await axios.get(`/user/followers?page=${page}`);
  return data;
};
