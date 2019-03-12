import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import SignInUp from "js/components/SignInUp";
import { GrowTypo, Root, MenuButton } from "./StyledParts";
import { Link } from "js/components/Divers/Link";

function AnonHeader({ sign, from }) {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              J4U
            </Link>
          </GrowTypo>
          <SignInUp sign={sign} from={from} />
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default AnonHeader;
