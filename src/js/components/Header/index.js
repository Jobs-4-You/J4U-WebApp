import React from "react";
import { Subscribe } from "unstated";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
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
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Contact" onClick={() => history.push('/contact')}/>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="About" onClick={() => history.push('/about')}/>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem button>
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText primary="Legal Infos" onClick={() => history.push('/legal')}/>
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
