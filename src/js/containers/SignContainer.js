import { Container } from 'unstated';
import validator from 'validator';

class SignContainer extends Container {

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


  validateEmail = (x) => {
    return validator.isEmail(x);
  }

  validatePassword = (x) => {
    return validator.isLength(x, { min: 4, max: 16 });
  }

  get valid() {
    return Object.keys(this.state).map(x => this.state[x].valid).reduce((acc, curr) => acc && curr);
  }

  handleEmailChange = (e) => {
    const newValue = e.target.value;
    this.setState({ email: { value: newValue, valid: this.validateEmail(newValue) } })
  }

  handlePasswordChange = (e) => {
    const newValue = e.target.value;
    this.setState({ password: { value: e.target.value, valid: this.validatePassword(newValue) } })
  }

  handleSubmit = (e, appContainer, history, from, displayError) => {
    e.preventDefault();
    appContainer.signin(this.state.email.value, this.state.password.value, history, from, displayError);
  }


}

export default SignContainer;