import React from "react";
import { Subscribe } from "unstated";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import {Chat, VerifiedUser, Info} from "@material-ui/icons";
import AppContainer from "js/containers/appContainer";
import AnonHeader from "./AnonHeader";
import AuthHeader from "./AuthHeader";
import history from 'js/router';


function ButtonAppBar({ sign, from }) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        const header = appContainer.state.email ? (
          <AuthHeader appContainer={appContainer} />
        ) : (
          <AnonHeader
            sign={sign}
            from={from}
            openDrawer={appContainer.openDrawer}
          />
        );
        return (
          <div>
            <SwipeableDrawer
              anchor="left"
              open={appContainer.state.drawerIsOpen}
              onClose={appContainer.closeDrawer}
              onOpen={appContainer.openDrawer}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={appContainer.closeDrawer}
                onKeyDown={appContainer.closeDrawer}
              >
                <div>
                  <List onClick={() => history.push('/contact')}>
                    <ListItem button>
                      <ListItemIcon>
                        <Chat />
                      </ListItemIcon>
                      <ListItemText primary="Contact" />
                    </ListItem>
                  </List>
                  <List onClick={() => history.push('/about')}>
                    <ListItem button>
                      <ListItemIcon>
                        <Info />
                      </ListItemIcon>
                      <ListItemText primary="À propos" />
                    </ListItem>
                  </List>
                  <List onClick={() => history.push('/legal')}>
                    <ListItem button>
                      <ListItemIcon>
                        <VerifiedUser />
                      </ListItemIcon>
                      <ListItemText primary="Informations légales " />
                    </ListItem>
                  </List>
                </div>
              </div>
            </SwipeableDrawer>
            {header}
          </div>
        );
      }}
    </Subscribe>
  );
}

export default ButtonAppBar;
