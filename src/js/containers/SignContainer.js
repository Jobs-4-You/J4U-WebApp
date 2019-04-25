import { Container } from "unstated";
import { resetPasswordMailQuery } from "js/data";
import validator from "validator";

class SignContainer extends Container {
  state = {
    dialogOpen: false,
    emailForgottenPwd: '',
    email: {
      value: "",
      valid: false
    },
    password: {
      value: "",
      valid: false
    }
  };

  openDialog = () => {
    this.setState({dialogOpen: true})
  }

  closeDialog = () => {
    this.setState({dialogOpen: false})
  }

  emailForgottenPwdChange = (e) => {
    this.setState({emailForgottenPwd: e.target.value})
  }

  resetPassword = async (email, displayError) => {
    try {
      const res = await resetPasswordMailQuery(email);
      this.openDialog()
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };


  validateEmail = x => {
    return validator.isEmail(x);
  };

  validatePassword = x => {
    return validator.isLength(x, { min: 4, max: 16 });
  };

  get valid() {
    const s = Object.keys(this.state)
    return s.slice(2, s.length)
      .map(x => this.state[x].valid)
      .reduce((acc, curr) => acc && curr);
  }

  handleEmailChange = e => {
    const newValue = e.target.value;
    this.setState({
      email: { value: newValue, valid: this.validateEmail(newValue) }
    });
  };

  handlePasswordChange = e => {
    const newValue = e.target.value;
    this.setState({
      password: {
        value: e.target.value,
        valid: this.validatePassword(newValue)
      }
    });
  };

  handleSubmit = (e, appContainer, history, from, displayError, updateContainer) => {
    e.preventDefault();
    appContainer.signin(
      this.state.email.value,
      this.state.password.value,
      history,
      from,
      displayError,
      updateContainer
    );
  };
}

export default SignContainer;
