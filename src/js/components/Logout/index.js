import React from 'react';
import { Redirect } from 'react-router-dom';

const env = process.env.NODE_ENV

const baseURL = env == 'development' ? 'http://localhost:8080' :
  'https://j4u.unil.ch'

function Logout(props) {
  console.log('aaa')
  localStorage.setItem("token", null);
  window.location.replace(baseURL);
  return (
    <div>
    </div>
  )
}

export default Logout;