import React from 'react';
import { withRouter } from 'react-router-dom'
import { withState, compose } from 'recompose';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';

const Wrapper = styled.div`
  width: 30%;
  margin: auto;
  margin-top: 30px;
  padding: 15px;
  box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.30);
`

const enhancedLogin = compose(
  withState('email', 'setEmail', ''),
  withState('pwd', 'setPwd', ''),
  withRouter,
);
const Login = enhancedLogin(({ setEmail, setPwd, ...props }) => {
  return (
    <Wrapper>
      <TextField
        id="input-with-icon-textfield"
        label="Email"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={x => setEmail(x.target.value)}
      />
      <TextField
        id="input-with-icon-textfield"
        label="Password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={x => setPwd(x.target.value)}
      />
      <Button onClick={() => props.appStore.login(props.email, props.pwd, props.history)}>
        LOGIN
      </Button>
    </Wrapper>
  )
})

export default inject('appStore')(Login);
