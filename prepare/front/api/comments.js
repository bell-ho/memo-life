import axios from 'axios';
import { backUrl } from '~/config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export const addCommentAPI = async (params) => {
  const { data } = await axios.post(`/post/${params.postId}/comment`, params);
  return data;
};
