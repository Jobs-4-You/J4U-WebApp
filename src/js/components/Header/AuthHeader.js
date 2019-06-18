import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { GrowTypo, Root, MenuButton, AccountIcon } from "./StyledParts";
import { Link } from "js/components/Divers/Link";

const NavLink = {
  textDecoration: "none",
  textTransform: "uppercase"
};

function AuthHeader({ appContainer }) {
  return (
    <Root>
      <AppBar position="static">
        <Toolbar>
          <MenuButton color="inherit" aria-label="Menu" onClick={appContainer.openDrawer}>
            <MenuIcon />
          </MenuButton>
          <GrowTypo variant="h6" color="inherit" grow={0}>
            <Link to="/" style={NavLink}>
              J4U
            </Link>
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={1}>
            <Link to="/account" style={NavLink}>
              <AccountIcon />
            </Link>
            {`${appContainer.state.firstName} ${appContainer.state.lastName}`}
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={0}>
            {appContainer.state.formDone && !appContainer.state.blocked ? (
              <Link to="/recommendation" style={NavLink}>
                {
                  appContainer.state.group.indexOf("J4U") !== -1
                    ? "Recommandations professionnelles" 
                    : "Recherche d'emploi"
                }
              </Link>
            ) : null}
          </GrowTypo>
          <GrowTypo variant="subtitle1" color="inherit" grow={0}>
            <Link to="/logout" style={NavLink}>
              Se Déconnecter
            </Link>
          </GrowTypo>
        </Toolbar>
      </AppBar>
    </Root>
  );
}

export default AuthHeader;
