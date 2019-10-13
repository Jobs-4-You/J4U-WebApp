import React from 'react';
import { Subscribe } from 'unstated'
import AppContainer from 'js/containers/appContainer';
import AnonLanding from './AnonLanding';
import AuthLanding from './AuthLanding';
import AuthLandingNew from './AuthLandingNew';

function Landing(props) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        const landing = appContainer.state.email ? <AuthLandingNew appContainer={appContainer} /> : <AnonLanding />
        return (
          <div>
            {landing}
          </div>
        )
      }}
    </Subscribe>
  );
}

export default Landing;