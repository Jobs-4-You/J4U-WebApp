import React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button'
import { GrowTypo, Root, MenuButton } from './StyledParts'


function AuthHeader({ user }) {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={0}>
            J4U
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={1}>
            {user}
          </GrowTypo>
          <Button color="inherit" ><Link to="/recommendation">Job Recommendation</Link> </Button>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default AuthHeader;