import React from 'react';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const L = styled(Link)`
  color: white;
`

const Sep = styled.span`
  width: 20px;
`

function LoggedHeader(props) {
  console.log(props.appStore.email, '------')
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit">
            J4U
          </Typography>
          <Sep />
          <Typography variant="subtitle1" color="inherit">
            {`WELCOME ${props.appStore.email}`}
          </Typography>
          <Button onClick={() => props.appStore.logout(props.history)}>
            LOGOUT
          </Button>
          <Button color="inherit">
            <L to={'/recom'}>Recom</L>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function AnonHeader(props) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" color="inherit">
            J4U
        </Typography>
          <Button color="inherit">
            <L to={'/login'}>LOGIN</L>
          </Button>
          <Button color="inherit">
            <L to={'/signup'}>SIGN UP</L>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const Header = (props) => {
  if (props.appStore.loggedIn) {
    return <LoggedHeader {...props} />
  } else {
    return <AnonHeader {...props} />
  }
}

export default withRouter(inject('appStore')(observer(Header)));
