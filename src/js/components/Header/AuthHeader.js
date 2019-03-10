import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { GrowTypo, Root, MenuButton, AccountIcon } from './StyledParts'
import { Link } from 'js/components/Divers/Link'


function AuthHeader({ appContainer }) {
  console.log(appContainer, '!!!!!')
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={0}>
            <Link to="/" style={{ textDecoration: 'none' }}>J4U</Link>
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={1}>
            <Link to="/account" style={{ textDecoration: 'none' }}><AccountIcon /></Link>
            {`${appContainer.state.firstName} ${appContainer.state.lastName}`}
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={0}>
            {appContainer.state.formDone ? <Link to="/recommendation" style={{ textDecoration: 'none' }}>JOB RECOMMENDATION</Link> : null}
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={0}>
            <Link to="/logout" style={{ textDecoration: 'none' }}>LOGOUT</Link>
          </GrowTypo>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default AuthHeader;