import React from 'react';
import { withRouter } from 'react-router-dom'
import { withState, compose } from 'recompose';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

const Wrapper = styled.div`
  width: 300px;
  margin: auto;
  margin-top: 30px;
  padding: 15px;
  box-shadow: 10px 10px 20px 0px rgba(0,0,0,0.30);
`

const Header = styled.div`
  width: 100%;
  text-align: center;
`

const enhancedSignup = compose(
  withState('pseudo', 'setPseudo', ''),
  withState('email', 'setEmail', ''),
  withState('pwd', 'setPwd', ''),
  withRouter,
);
const Signup = enhancedSignup(({ setPseudo, setEmail, setPwd, ...props }) => {
  return (
    <Wrapper>
      <Header>
        <Typography variant="h6" color="inherit">
          SIGNUP
        </Typography>
      </Header>
      <TextField
        id="input-with-icon-textfield"
        label="Pseudo"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        onChange={x => setPseudo(x.target.value)}
      />
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
      <br/>
      <br/>
      <Button
        onClick={() => props.appStore.signup(props.pseudo, props.email, props.pwd, props.history)}
        color="primary"
        variant="contained"
      >
        SIGN UP
      </Button>
    </Wrapper>
  )
})

export default inject('appStore')(Signup);
