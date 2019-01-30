import axios from 'axios';

const env = process.env.NODE_ENV

const baseURL = env == 'development' ? 'http://localhost:5000' :
  'https://j4u.unil.ch:3000'

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

export function signupQuery(firstName, lastName, email, phone,  password, plastaId) {
  const data = {
    firstName,
    lastName,
    phone,
    email,
    password,
    plastaId
  }
  console.log(data)
  return axios({
    method: 'post',
    url: `${baseURL}/signup`,
    data: data,
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
