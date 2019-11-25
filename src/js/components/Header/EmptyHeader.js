import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { GrowTypo, Root, MenuButton } from "./StyledParts";
import { Link } from "js/components/Divers/Link";

function EmptyHeader() {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu"></MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={1}>
            <Link to="/" style={{ textDecoration: "none" }}>
              J4U
            </Link>
          </GrowTypo>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default EmptyHeader;
