import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Provider } from "unstated";
import { AnimatedSwitch } from "react-router-transition";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Header from "js/components/Header";
import Recommendation from "js/components/Recommendation";
import Landing from "js/components/Landing";
import Account from "js/components/Account";
import Verified from "js/components/Verified";
import Logout from "js/components/Logout";
import history from "js/router";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const Error = ({ open, message, handleClose }) => {
  return (
    <Dialog
      style={{ zIndex: 10000 }}
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{"ERREUR"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

function PrivateRoute({ component: Component, authed, path, ...rest }) {
  const comp = authed
    ? Component
    : () => (
        <Redirect
          to={{ pathname: "/signin", state: { from: rest.location } }}
        />
      );
  return <Route exact path={path} component={comp} {...rest} />;
}

const AnimSwitch = styled(AnimatedSwitch)`
  width: 100%;
  position: relative;
  > div {
    position: absolute;
  }
`;

const wrapper = document.getElementById("app");

const Home = ({ sign, location }) => {
  console.log("xxxx", location.state);
  return (
    <div>
      <Header sign={sign} from={location.state ? location.state.from : null} />
      <Landing />
    </div>
  );
};

const VerifiedView = () => {
  return (
    <div>
      <Header />
      <Verified />
    </div>
  );
};

const LogoutView = () => {
  return (
    <div>
      <Header />
      <Logout />
    </div>
  );
};

const RecommendationView = () => {
  return (
    <div>
      <Header />
      <Recommendation />
    </div>
  );
};

const AccountView = () => {
  return (
    <div>
      <Header />
      <Account />
    </div>
  );
};

const App = () => {
  return (
    <Subscribe to={[AppContainer, ErrorContainer]}>
      {(appContainer, errorContainer) => {
        console.log(
          errorContainer.state.message,
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );
        return (
          <div>
            <Error
              message={errorContainer.state.message}
              open={errorContainer.state.open}
              handleClose={errorContainer.onClose}
            />
            <Switch
              atEnter={{ opacity: 0 }}
              atLeave={{ opacity: 0 }}
              atActive={{ opacity: 1 }}
            >
              <Route exact path="/" component={Home} />
              <Route
                exact
                path="/signin"
                component={props => <Home sign="in" {...props} />}
              />
              <Route
                exact
                path="/signup"
                component={props => <Home sign="up" {...props} />}
              />
              <Route exact path="/logout" component={LogoutView} />
              <Route exact path="/verified" component={VerifiedView} />
              <PrivateRoute
                authed={appContainer.state.formDone}
                exact
                path="/recommendation"
                component={RecommendationView}
              />
              <PrivateRoute
                authed={appContainer.state.email}
                exact
                path="/account"
                component={AccountView}
              />
            </Switch>
          </div>
        );
      }}
    </Subscribe>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
    fontFamily: '"Roboto"',
    typography: {
      useNextVariants: true,
    },
  }
});

ReactDOM.render(
  <Provider>
    <HashRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
