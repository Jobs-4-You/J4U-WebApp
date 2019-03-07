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

const seco = axios.create({
  baseURL: "https://cors-anywhere.herokuapp.com/https://www.job-room.ch/",
  timeout: 5000,
});

export function secoQuery(professionCodes){
  var data = JSON.stringify({
    "permanent": null,
    "workloadPercentageMin": 0,
    "workloadPercentageMax": 100,
    "onlineSince": 30,
    "displayRestricted": false,
    "keywords": [],
    "professionCodes": professionCodes,
    "communalCodes": [],
    "cantonCodes": []
  });
  
  return seco({
    method: 'post',
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/plain, */*",
      "X-Requested-With": "XMLHttpRequest",
      "cache-control": "no-cache",
      "Postman-Token": "22ba6716-13b5-45c9-bf21-0d3f0f4566be"
    },
    url: '/jobadservice/api/jobAdvertisements/_search?page=0&size=20&sort=score',
    data,
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