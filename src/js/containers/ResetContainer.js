import { Container } from "unstated";
import validator from "validator";
import { resetPasswordQuery } from "js/data";
import history from "js/router";

class ResetContainer extends Container {
  state = {
    password: {
      value: "",
      valid: false
    },
    passwordConf: {
      value: "",
      valid: false
    }
  };

  get valid() {
    const s = Object.keys(this.state);
    return s
      .slice(1, s.length)
      .map(x => this.state[x].valid)
      .reduce((acc, curr) => acc && curr);
  }

  handlePasswordChange = e => {
    const newValue = e.target.value;
    this.setState({
      password: {
        value: e.target.value,
        valid: this.validatePassword(newValue)
      }
    });
  };

  validatePassword = x => {
    return validator.isLength(x, { min: 4, max: 16 });
  };

  handlePasswordConfChange = e => {
    const newValue = e.target.value;
    this.setState({
      passwordConf: {
        value: e.target.value,
        valid: this.validatePasswordConf(newValue)
      }
    });
  };

  validatePasswordConf = x => {
    return (
      validator.isLength(x, { min: 4, max: 16 }) &&
      x === this.state.password.value
    );
  };

  reset = async (token, password, displayError) => {
    try {
      await resetPasswordQuery({token, password});
      history.push('signin')
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };
}

export default ResetContainer;
