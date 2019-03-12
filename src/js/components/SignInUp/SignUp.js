import React from "react";
import { Subscribe } from "unstated";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppContainer from "js/containers/appContainer";
import UpContainer from "js/containers/UpContainer";
import ErrorContainer from "js/containers/ErrorContainer";
import Dialog from "./Dialog";

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
    maxHeight: "98vh",
    overflow: "auto",
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
    marginTop: theme.spacing.unit * 3
  }
});

function SignUp({ classes, history }) {
  return (
    <Subscribe to={[AppContainer, UpContainer, ErrorContainer]}>
      {(appContainer, upContainer, errorContainer) => (
        <main className={classes.main}>
          <Dialog open={upContainer.state.dialogOpen} closeDialog={upContainer.closeDialog}/>
          {console.log(upContainer, "-----")}
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form}>
              <FormControl
                margin="normal"
                autoFocus
                required
                error={!upContainer.state.firstName.valid}
                fullWidth
              >
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="first-name"
                  autoFocus
                  value={upContainer.state.firstName.value}
                  onChange={upContainer.handleFNameChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.lastName.valid}
                fullWidth
              >
                <InputLabel htmlFor="firstName">Last Name</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="last-name"
                  autoFocus
                  value={upContainer.state.lastName.value}
                  onChange={upContainer.handleLNameChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.phone.valid}
                fullWidth
              >
                <InputLabel htmlFor="phone">Phone</InputLabel>
                <Input
                  id="phone"
                  name="phone"
                  autoComplete="phone"
                  autoFocus
                  value={upContainer.state.phone.value}
                  onChange={upContainer.handlePhoneChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.email.valid}
                fullWidth
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  id="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={upContainer.state.email.value}
                  onChange={upContainer.handleEmailChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.emailConf.valid}
                fullWidth
              >
                <InputLabel htmlFor="emailConf">Email Confirmation</InputLabel>
                <Input
                  id="emailConf"
                  name="emailConf"
                  autoComplete="email-conf"
                  autoFocus
                  value={upContainer.state.emailConf.value}
                  onChange={upContainer.handleEmailConfChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.password.valid}
                fullWidth
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  autoFocus
                  value={upContainer.state.password.value}
                  onChange={upContainer.handlePasswordChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.passwordConf.valid}
                fullWidth
              >
                <InputLabel htmlFor="passwordConf">
                  Password Confirmation
                </InputLabel>
                <Input
                  type="password"
                  id="passwordConf"
                  name="passwordConf"
                  autoComplete="password-conf"
                  autoFocus
                  value={upContainer.state.passwordConf.value}
                  onChange={upContainer.handlePasswordConfChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.plastaId.valid}
                fullWidth
              >
                <InputLabel htmlFor="plastaId">Plasta ID</InputLabel>
                <Input
                  id="plastaId"
                  name="plastaId"
                  autoComplete="plasta-id"
                  value={upContainer.state.plastaId.value}
                  onChange={upContainer.handlePlastaIdChange}
                />
              </FormControl>

              <Button
                disabled={!upContainer.valid}
                onClick={e =>
                  upContainer.handleSubmit(
                    e,
                    appContainer,
                    history,
                    errorContainer.displayError
                  )
                }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
            </form>
          </Paper>
        </main>
      )}
    </Subscribe>
  );
}

export default withStyles(styles)(withRouter(SignUp));
