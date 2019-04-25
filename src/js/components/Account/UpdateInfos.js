import React from "react";
import { Subscribe } from "unstated";
import { withRouter } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import AppContainer from "js/containers/appContainer";
import UpContainer from "js/containers/UpdateContainer";
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

function UpdateInfos({ classes, history }) {
  return (
    <Subscribe to={[AppContainer, UpContainer, ErrorContainer]}>
      {(appContainer, upContainer, errorContainer) => {
        console.log(upContainer.state)
        return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h5">
              Modifier les informations du compte
            </Typography>
            <form className={classes.form}>
              <FormControl
                margin="normal"
                required
                error={!upContainer.state.firstName.valid}
                fullWidth
              >
                <InputLabel htmlFor="firstName">Prénom</InputLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  autoFocus={true}
                  autoComplete="first-name"
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
                <InputLabel htmlFor="firstName">Nom</InputLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="last-name"
                  value={upContainer.state.lastName.value}
                  onChange={upContainer.handleLNameChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                fullWidth
                required
                error={!upContainer.state.birthdate.valid}
              >
                <TextField
                  id="birthdate"
                  label="Date de naissance"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  fullWidth
                  value={new Date(upContainer.state.birthdate.value).toISOString().slice(0,10)}
                  error={!upContainer.state.birthdate.valid}
                  onChange={upContainer.handleBirthdateChange}
                />
              </FormControl>

              <FormControl
                margin="normal"
                required
                error={!upContainer.state.phone.valid}
                fullWidth
              >
                <InputLabel htmlFor="phone">
                  Numéro de téléphone portable
                </InputLabel>
                <Input
                  id="phone"
                  name="phone"
                  autoComplete="phone"
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
                <InputLabel htmlFor="emailConf">
                  Confirmation de l'émail
                </InputLabel>
                <Input
                  id="emailConf"
                  name="emailConf"
                  autoComplete="email-conf"
                  value={upContainer.state.emailConf.value}
                  onChange={upContainer.handleEmailConfChange}
                />
              </FormControl>


              <FormControl
                margin="normal"
                required
                error={!upContainer.state.plastaId.valid}
                fullWidth
              >
                <InputLabel htmlFor="plastaId">ID Plasta</InputLabel>
                <Input
                  id="plastaId"
                  name="plastaId"
                  autoComplete="plasta-id"
                  value={upContainer.state.plastaId.value}
                  onChange={upContainer.handlePlastaIdChange}
                  placeholder="XX123456"
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
                Mettre à jour
              </Button>
            </form>
          </Paper>
        </main>
      )}}
    </Subscribe>
  );
}

export default withStyles(styles)(withRouter(UpdateInfos));
