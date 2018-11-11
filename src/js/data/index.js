import axios from 'axios';

const baseURL = 'http://localhost:5000'

export function loginQuery(email, pwd) {
  const bodyFormData = new FormData();
  bodyFormData.set('email', email);
  bodyFormData.set('password', pwd);
  return axios({
    method: 'post',
    url: `${baseURL}/login`,
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
}

export function signupQuery(pseudo, email, pwd) {
  const bodyFormData = new FormData();
  bodyFormData.set('pseudo', pseudo);
  bodyFormData.set('email', email);
  bodyFormData.set('password', pwd);
  return axios({
    method: 'post',
    url: `${baseURL}/signup`,
    data: bodyFormData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
}

export function recomQuery(urlParams) {
  return axios({
    method: 'get',
    url: `${baseURL}/recom`,
    params: urlParams,
  });
}
