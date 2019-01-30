import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Provider } from 'unstated'
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Header from 'js/components/Header';
import Recommendation from 'js/components/Recommendation';
import Landing from 'js/components/Landing';
import Account from 'js/components/Account';

const AnimSwitch = styled(AnimatedSwitch)`
  width: 100%;
  position: relative;
  > div {
    position: absolute;
  }
`;

const wrapper = document.getElementById("app");

const Home = () => {
  return (
    <Landing />
  )
}

const RecommendationView = () => {
  return (
    <div>
      <Recommendation />
    </div>
  )
}

const AccountView = () => {
  return (
    <div>
      <Account />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <Switch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route exact path='/' component={Home} />
        <Route exact path='/recommendation' component={RecommendationView} />
        <Route exact path='/account' component={AccountView} />
      </Switch>
    </div>
  )
}

const theme = createMuiTheme({
  palette: {
    primary: blue,
    fontFamily: '"Roboto"'
  },
});

ReactDOM.render((
  <Provider>
    <BrowserRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>
  </Provider>
), document.getElementById('app'));
