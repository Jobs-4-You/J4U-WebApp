import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unstated'
import { AnimatedSwitch } from 'react-router-transition';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Header from 'js/components/Header';
import Recommendation from 'js/components/Recommendation';

const wrapper = document.getElementById("app");

const Home = () => {
  return (
    <div>
    </div>
  )
}

const RecommendationView = () => {
  return (
    <div>
      <Recommendation />
    </div>
  )
}

const App = () => {
  return (
    <div>
      <Header />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route exact path='/' component={Home} />
        <Route exact path='/recommendation' component={RecommendationView} />
      </AnimatedSwitch>
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
