import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import SignInUp from 'js/components/SignInUp';
import { GrowTypo, Root, MenuButton } from './StyledParts'


function AnonHeader(props) {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={1}>
            J4U
          </GrowTypo>
          <SignInUp />
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default AnonHeader;