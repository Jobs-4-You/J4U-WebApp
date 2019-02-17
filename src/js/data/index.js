import axios from 'axios';
import history from 'js/router';

const env = process.env.NODE_ENV

const baseURL = env == 'development' ? 'http://localhost:5000' :
  'https://j4u.unil.ch:5000'


const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

function errorResponseHandler(error) {
  if (error.response.status === 401) {
    history.push('/logout')
  } else {
    return Promise.reject(error);

  }
}

client.interceptors.request.use(
  reqConfig => {
    const user = JSON.parse(localStorage.getItem('appState'));
    let accessToken = user ? user.accessToken : '';
    accessToken = accessToken ? accessToken : '';
    console.log(accessToken)
    reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    return reqConfig;
  },
  err => Promise.reject(err),
);

client.interceptors.response.use(
  response => response,
  errorResponseHandler
);


export function signinQuery(email, pwd) {
  const data = {
    email,
    password: pwd
  }
  console.log(axios.baseURL)
  return client({
    method: 'post',
    url: 'login',
    data: data,
  });
}

export function signupQuery(firstName, lastName, email, phone, password, plastaId) {
  const data = {
    firstName,
    lastName,
    phone,
    email,
    password,
    plastaId
  }
  console.log(data)
  return client({
    method: 'post',
    url: 'signup',
    data: data,
  });
}

export function recomQuery(data) {
  return client({
    method: 'post',
    url: 'recom',
    data,
  });
}

export function trackQuery(data) {
  return client({
    method: 'post',
    url: 'track',
    data,
  });
}

export function searchQuery(job) {
  return client({
    method: 'get',
    url: 'jobprops',
    params: {
      job
    },
  });
}

export function linkQuery(job) {
  return client({
    method: 'get',
    url: 'link',
  });
}