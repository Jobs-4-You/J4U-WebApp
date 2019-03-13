import React from 'react';
import { Subscribe } from 'unstated';
import { withRouter, Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import AppContainer from 'js/containers/appContainer';
import SignContainer from 'js/containers/SignContainer';
import ErrorContainer from 'js/containers/ErrorContainer';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    paddingTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  }
});

function SignIn({ classes, history, from }) {

  return (
    <Subscribe to={[AppContainer, SignContainer, ErrorContainer]}>
      {(appContainer, signContainer, errorContainer) => (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              SE CONNECTER
            </Typography>
            <form className={classes.form}>
              <FormControl margin="normal" required error={!signContainer.state.email.valid} fullWidth>
                <InputLabel htmlFor="email">Adresse Électronique</InputLabel>
                <Input id="email" name="email" autoComplete="email" autoFocus value={signContainer.state.email.value} onChange={signContainer.handleEmailChange} />
              </FormControl>
              <FormControl margin="normal" required error={!signContainer.state.password.valid} fullWidth>
                <InputLabel htmlFor="password">Mot de passe</InputLabel>
                <Input name="password" type="password" id="password" autoComplete="current-password" value={signContainer.state.password.value} onChange={signContainer.handlePasswordChange} />
              </FormControl>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Se souvenir de moi"
              />
                <Link to="signup" block={false}>
                  <Typography align="right" variant="button" inline={true} color="textPrimary">Créer un compte</Typography>
                </Link>
              <Button
                disabled={!signContainer.valid}
                onClick={(e) => signContainer.handleSubmit(e, appContainer, history, from, errorContainer.displayError)}
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                SE CONNECTER
              </Button>
            </form>
          </Paper>
        </main>)}
    </Subscribe>
  );
}

export default withStyles(styles)(withRouter(SignIn));