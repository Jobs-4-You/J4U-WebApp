import React from 'react';
import { Subscribe } from 'unstated'
import AppContainer from 'js/containers/appContainer';
import AnonHeader from './AnonHeader';
import AuthHeaer from './AuthHeader';

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        console.log(appContainer.state)
        const header = appContainer.state.user ? <AuthHeaer user={appContainer.state.user} /> : <AnonHeader />
        return (
          <div>
            {header}
          </div>
        )
      }}
    </Subscribe>
  );
}

export default ButtonAppBar;