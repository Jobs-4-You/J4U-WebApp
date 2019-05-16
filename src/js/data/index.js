import axios from "axios";
import history from "js/router";

const env = process.env.NODE_ENV;

const baseURL =
  env == "development" ? "http://localhost:5000" : "https://j4u.unil.ch:5000";

const client = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

function errorResponseHandler(error) {
  console.log(error)
  if (error.response.status === 401) {
    history.push("/logout");
  } else {
    return Promise.reject(error);
  }
}

client.interceptors.request.use(
  reqConfig => {
    const a = localStorage.getItem('accessToken');
    const accessToken = a ? a : '';
    reqConfig.headers.Authorization = `Bearer ${accessToken}`;
    return reqConfig;
  },
  err => Promise.reject(err)
);

client.interceptors.response.use(response => response, errorResponseHandler);

export function signinQuery(email, pwd) {
  const data = {
    email,
    password: pwd
  };
  console.log(axios.baseURL);
  return client({
    method: "post",
    url: "login",
    data: data
  });
}

export function signupQuery(
  firstName,
  lastName,
  email,
  phone,
  password,
  plastaId,
  birthDate,
  group
) {
  const data = {
    firstName,
    lastName,
    phone,
    email,
    password,
    plastaId,
    birthDate,
    group
  };
  console.log(data);
  return client({
    method: "post",
    url: "signup",
    data: data
  });
}

export function updateQuery(
  firstName,
  lastName,
  email,
  phone,
  plastaId,
  birthDate,
) {
  const data = {
    firstName,
    lastName,
    phone,
    email,
    plastaId,
    birthDate,
  };
  console.log(data);
  return client({
    method: "post",
    url: "update",
    data: data
  });
}

const seco = axios.create({
  baseURL: env == "development" ? "http://localhost:8000/https://www.job-room.ch/" : "https://j4u.unil.ch:8000/https://www.job-room.ch/",
  timeout: 5000
});

// professionCodes: array of strings (AVAM codes), currentPage: integer (SECO pagination), locationValue: string (canton filter)
export function secoQuery(professionCodes, currentPage, locationValue) {
  var data = JSON.stringify({
    permanent: null,
    workloadPercentageMin: 0,
    workloadPercentageMax: 100,
    onlineSince: 30,
    displayRestricted: false,
    keywords: [],
    professionCodes: professionCodes,
    communalCodes: [],
    cantonCodes: [locationValue]
  });

  return client({
    method: "post",
    url: "positions",
    data: { codes: professionCodes, currentPage: currentPage, cantonCodes: [locationValue] }
  });
}

export function recomQuery(data) {
  return client({
    method: "post",
    url: "recom",
    data
  });
}

export function trackQuery(data) {
  return client({
    method: "post",
    url: "track",
    data
  });
}

export function searchQuery(job) {
  return client({
    method: "get",
    url: "jobprops",
    params: {
      job
    }
  });
}

export function locationsQuery(loc) {
  return client({
    method: "get",
    url: "locations",
    params: {
      loc
    }
  });
}

export function linkQuery(job) {
  return client({
    timeout: 20000,
    method: "get",
    url: "link"
  });
}

export function userInfosQuery() {
  return client({
    method: "get",
    url: "userinfos"
  });
}

export function sendVerificationQuery() {
  return client({
    method: "get",
    url: "sendverification"
  });
}

export function resetPasswordMailQuery(email) {
  return client({
    method: "get",
    url: "resetpasswordmail",
    params: {
      email
    }
  });
}

export function resetPasswordQuery(data) {
  console.log(data)
  return client({
    method: "post",
    url: "resetpassword",
    data
  });
}