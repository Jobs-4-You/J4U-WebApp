import HMR from "unstated-hmr"; // Just load the library before initializing the containers
if (module.hot) module.hot.accept();
const env = process.env.NODE_ENV;
HMR.isEnabled = env === "development";

import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Provider } from "unstated";
import { AnimatedSwitch } from "react-router-transition";
import { Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { Helmet } from "react-helmet";
import { Subscribe } from "unstated";
import AppContainer from "js/containers/appContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Header from "js/components/Header";
import Recommendation from "js/components/Recommendation";
import Landing from "js/components/Landing";
import Account from "js/components/Account";
import Verified from "js/components/Verified";
import Logout from "js/components/Logout";
import Contact from "js/components/Contact";
import About from "js/components/About";
import Legal from "js/components/Legal";
import Reset from "js/components/Reset";
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
      <DialogTitle id="alert-dialog-slide-title">{"ALERTE"}</DialogTitle>
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
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Home</title>
      </Helmet>
      <Header sign={sign} from={location.state ? location.state.from : null} />
      <Landing />
    </div>
  );
};

const ResetView = ({ location }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Reset-Password</title>
      </Helmet>
      <Header />
      <Reset token={location.search.slice(7, location.search.length)} />
    </div>
  );
};

const ContactView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Contact</title>
      </Helmet>
      <Header />
      <Contact />
    </div>
  );
};
const LegalView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Legal</title>
      </Helmet>
      <Header />
      <Legal />
    </div>
  );
};

const AboutView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-About</title>
      </Helmet>
      <Header />
      <About />
    </div>
  );
};

const VerifiedView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Verification</title>
      </Helmet>
      <Header />
      <Verified />
    </div>
  );
};

const LogoutView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Logout</title>
      </Helmet>
      <Header />
      <Logout />
    </div>
  );
};

const RecommendationView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Recommendation</title>
      </Helmet>
      <Header />
      <Recommendation />
    </div>
  );
};

const AccountView = () => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>J4U-Infos</title>
      </Helmet>
      <Header />
      <Account />
    </div>
  );
};

const App = () => {
  return (
    <Subscribe to={[AppContainer, ErrorContainer]}>
      {(appContainer, errorContainer) => {
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
              <Route exact path="/contact" component={ContactView} />
              <Route exact path="/about" component={AboutView} />
              <Route exact path="/legal" component={LegalView} />
              <Route exact path="/reset" component={ResetView} />
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
      useNextVariants: true
    }
  }
});

ReactDOM.render(
  <Provider>
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById("app")
);
