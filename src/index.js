import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'mobx-react';
import appStore from './js/stores/appStore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Header from './js/components/Header';
import Login from './js/components/Login';
import Signup from './js/components/Signup';
import Recom from './js/components/Recom';


const wrapper = document.getElementById("app");

const Home = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

const Signin = () => {
  return (
    <div>
      <Header />
      <Login />
    </div>
  )
}

const SignupView = () => {
  return (
    <div>
      <Header />
      <Signup />
    </div>
  )
}

const RecomView = () => {
  return (
    <div>
      <Header />
      <Recom />
    </div>
  )
}

const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Signin} />
      <Route path='/signup' component={SignupView} />
      <Route path='/recom' component={RecomView} />
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
  <BrowserRouter>
    <Provider appStore={appStore}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </Provider>
  </BrowserRouter>
), document.getElementById('app'));
