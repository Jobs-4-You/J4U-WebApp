import React from "react";
import { Subscribe } from "unstated";
import { withRouter, Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppContainer from "js/containers/appContainer";
import SignContainer from "js/containers/SignContainer";
import UpdateContainer from "js/containers/UpdateContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import DialogForgotten from "./DialogForgotten";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    paddingTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  }
});

const linkCompte = {
  textAlign: "center",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  textDecoration: "none",
  color: "#2196f3",
  clear: "both",
  display:"block",
  fontFamily:'"Roboto", "Helvetica", "Arial", sans-serif',
  fontSize: "0.875rem",
  fontWeight: "500",
  textTransform: "uppercase"
};

function SignIn({ classes, history, from }) {
  return (
    <Subscribe to={[AppContainer, SignContainer, ErrorContainer, UpdateContainer]}>
      {(appContainer, signContainer, errorContainer, updateContainer) => (
        <main className={classes.main}>
          <DialogForgotten
            open={signContainer.state.dialogOpen}
            closeDialog={signContainer.closeDialog}
            value={signContainer.state.emailForgottenPwd}
            valueChange={signContainer.emailForgottenPwdChange}
            reset={signContainer.resetPassword}
            displayError={errorContainer.displayError}
          />
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SE CONNECTER
            </Typography>
            <form className={classes.form}>
              <FormControl
                margin="normal"
                required
                error={!signContainer.state.email.valid}
                fullWidth
              >
                <InputLabel htmlFor="email">Adresse Électronique</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={signContainer.state.email.value}
                  onChange={signContainer.handleEmailChange}
                />
              </FormControl>
              <FormControl
                margin="normal"
                required
                error={!signContainer.state.password.valid}
                fullWidth
              >
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={signContainer.state.password.value}
                  onChange={signContainer.handlePasswordChange}
                />
              </FormControl>
              
              <Button
                disabled={!signContainer.valid}
                onClick={e =>
                  signContainer.handleSubmit(
                    e,
                    appContainer,
                    history,
                    from,
                    errorContainer.displayError,
                    updateContainer
                  )
                }
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                SE CONNECTER
              </Button>

              <Button
                onClick={signContainer.openDialog}
                variant="text"
                align="center"
                textAlign="center"
                style={linkCompte}
                fullWidth
              >
                Mot de passe oublié?
              </Button>

              <Divider variant="inset" />

              <Link to="signup"
                style={linkCompte}
                paragraph={true}>
                  Créer un compte
              </Link>
              
            </form>
          </Paper>
        </main>
      )}
    </Subscribe>
  );
}

export default withStyles(styles)(withRouter(SignIn));
