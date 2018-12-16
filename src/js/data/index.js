import axios from 'axios';

const baseURL = 'http://localhost:5000'

export function signinQuery(email, pwd) {
  const data = {
    email,
    password: pwd
  }
  return axios({
    method: 'post',
    url: `${baseURL}/login`,
    data: data,
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

export function recomQuery(data, accessToken) {
  return axios({
    method: 'post',
    url: `${baseURL}/recom`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
