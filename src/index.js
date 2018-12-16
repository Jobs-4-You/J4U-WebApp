import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, Subscribe } from 'unstated'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Header from 'js/components/Header';
import Recommendation from 'js/components/Recommendation';

const wrapper = document.getElementById("app");

const Home = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

const RecommendationView = () => {
  return (
    <div>
      <Header />
      <Recommendation />
    </div>
  )
}

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/recommendation' component={RecommendationView} />
    </Switch>
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
