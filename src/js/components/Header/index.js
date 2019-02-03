import React from 'react';
import { Subscribe } from 'unstated'
import AppContainer from 'js/containers/appContainer';
import AnonHeader from './AnonHeader';
import AuthHeader from './AuthHeader';

function ButtonAppBar({ sign, from }) {
  return (
    <Subscribe to={[AppContainer]}>
      {appContainer => {
        console.log(appContainer.state)
        const header = appContainer.state.email ? <AuthHeader appContainer={appContainer} /> : <AnonHeader sign={sign} from={from}/>
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