import axios from 'axios';

export async function loadMyInfoAPI() {
  const { data } = await axios.get('/user');
  return data;
}

export async function signUpAPI(data) {
  const { data } = await axios.post('/user', data);
  return data;
}
