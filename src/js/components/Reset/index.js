import React from "react";
import { Subscribe } from "unstated";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import ResetContainer from "js/containers/ResetContainer";
import ErrorContainer from "js/containers/ErrorContainer";

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
  },
  textField: {
    width: "100%"
  }
});

function Reset({ classes, token }) {
  return (
    <Subscribe to={[ResetContainer, ErrorContainer]}>
      {(resetContainer, errorContainer) => (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Réinitialisation du mot de passe
            </Typography>
            <form className={classes.form}>
              <FormControl
                margin="normal"
                required
                error={!resetContainer.state.password.valid}
                fullWidth
              >
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="password"
                  value={resetContainer.state.password.value}
                  onChange={resetContainer.handlePasswordChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!resetContainer.state.passwordConf.valid}
                fullWidth
              >
                <InputLabel htmlFor="passwordConf">
                  Confirmation de mot de passe
                </InputLabel>
                <Input
                  type="password"
                  id="passwordConf"
                  name="passwordConf"
                  autoComplete="password-conf"
                  value={resetContainer.state.passwordConf.value}
                  onChange={resetContainer.handlePasswordConfChange}
                />
              </FormControl>

              <Button
                disabled={!resetContainer.valid}
                onClick={e =>
                  resetContainer.reset(
                    token,
                    resetContainer.state.password.value,
                    errorContainer.displayError
                  )
                }
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Réinitialiser
              </Button>
            </form>
          </Paper>
        </main>
      )}
    </Subscribe>
  );
}

export default withStyles(styles)(withRouter(Reset));
