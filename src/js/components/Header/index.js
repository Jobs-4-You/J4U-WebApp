import React from "react";
import { Subscribe } from "unstated";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import AppContainer from "js/containers/appContainer";
import AnonHeader from "./AnonHeader";
import AuthHeader from "./AuthHeader";

function ButtonAppBar({ sign, from }) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        const header = appContainer.state.email ? (
          <AuthHeader appContainer={appContainer} />
        ) : (
          <AnonHeader sign={sign} from={from} openDrawer={appContainer.openDrawer}/>
        );
        return (
          <div>
            <SwipeableDrawer
              anchor="top"
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
                faksdnfskldfms
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
