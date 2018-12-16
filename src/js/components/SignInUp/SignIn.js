import React from 'react';
import validator from 'validator';
import { Subscribe } from 'unstated';
import { withRouter } from 'react-router-dom'
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
    marginTop: theme.spacing.unit * 8,
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
  },
});

class SignIn extends React.Component {
  state = {
    email: {
      value: '',
      valid: false,
    },
    password: {
      value: '',
      valid: false,
    },
  };

  validateEmail(x) {
    return validator.isEmail(x);
  }

  validatePassword(x) {
    return validator.isLength(x, { min: 4, max: 16 });
  }

  handleEmailChange(e) {
    const newValue = e.target.value;
    this.setState({ email: { value: newValue, valid: this.validateEmail(newValue) } })
  }

  handlePasswordChange(e) {
    const newValue = e.target.value;
    this.setState({ password: { value: e.target.value, valid: this.validatePassword(newValue) } })
  }

  handleSubmit(e, appContainer) {
    e.preventDefault();
    appContainer.signin(this.state.email.value, this.state.password.value, this.props.history);
  }

  render() {
    const { classes } = this.props;

    return (
      <Subscribe to={[AppContainer]}>
        {appContainer => (
          <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form}>
                <FormControl margin="normal" required error={!this.state.email.valid} fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.email.value} onChange={this.handleEmailChange.bind(this)} />
                </FormControl>
                <FormControl margin="normal" required error={!this.state.password.valid} fullWidth>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.password.value} onChange={this.handlePasswordChange.bind(this)} />
                </FormControl>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  onClick={(e) => this.handleSubmit(e, appContainer)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign in
                </Button>
              </form>
            </Paper>
          </main>)}
      </Subscribe>
    );
  }
}

export default withStyles(styles)(withRouter(SignIn));