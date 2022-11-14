import axios from 'axios';

export async function loadMyInfoAPI() {
  const { data } = await axios.get('/user');
  return data;
}
