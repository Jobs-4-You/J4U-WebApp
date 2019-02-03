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

  handleEmailChange = (e) => {
    const newValue = e.target.value;
    this.setState({ email: { value: newValue, valid: this.validateEmail(newValue) } })
  }

  handlePasswordChange = (e) => {
    const newValue = e.target.value;
    this.setState({ password: { value: e.target.value, valid: this.validatePassword(newValue) } })
  }

  handleSubmit = (e, appContainer, history, from) => {
    e.preventDefault();
    appContainer.signin(this.state.email.value, this.state.password.value, history, from);
  }


}

export default SignContainer;