import axios from 'axios';

const env = process.env.NODE_ENV

const baseURL = env == 'development' ? 'http://localhost:5000' :
  'https://j4u.unil.ch:5000'

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

export function trackQuery(data, accessToken) {
  return axios({
    method: 'post',
    url: `${baseURL}/track`,
    data,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}

export function searchQuery(job, accessToken) {
  console.log(accessToken)
  return axios({
    method: 'get',
    url: `${baseURL}/jobprops`,
    params: {
      job
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
}
