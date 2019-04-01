import { Container } from "unstated";
import validator from "validator";
import { signupQuery } from "js/data";

class UpContainer extends Container {
  state = {
    dialogOpen: false,
    firstName: {
      value: "",
      valid: false
    },
    lastName: {
      value: "",
      valid: false
    },
    phone: {
      value: "",
      valid: false
    },
    email: {
      value: "",
      valid: false
    },
    emailConf: {
      value: "",
      valid: false
    },
    password: {
      value: "",
      valid: false
    },
    passwordConf: {
      value: "",
      valid: false
    },
    plastaId: {
      value: "",
      valid: false
    },
    birthdate: {
      value: "",
      valid: false
    }
  };

  openDialog = e => {
    this.setState({
      dialogOpen: true
    });
  };

  closeDialog = e => {
    this.setState({
      dialogOpen: false
    });
  };

  get valid() {
    const s = Object.keys(this.state)
    return s.slice(1, s.length)
      .map(x => this.state[x].valid)
      .reduce((acc, curr) => acc && curr);
  }

  handleFNameChange = e => {
    const newValue = e.target.value;
    this.setState({
      firstName: { value: newValue, valid: this.validateFName(newValue) }
    });
  };

  validateFName = x => {
    return validator.isAlpha(x);
  };

  handleLNameChange = e => {
    const newValue = e.target.value;
    this.setState({
      lastName: { value: newValue, valid: this.validateLName(newValue) }
    });
  };

  validateLName = x => {
    return validator.isAlpha(x);
  };

  handleBirthdateChange = e => {
    const newValue = e.target.value;
    this.setState({
      birthdate: { value: newValue, valid: this.validateBirthdate(newValue) }
    });
  };

  validateBirthdate = x => {
    return validator.isBefore(x);
  };

  handlePhoneChange = e => {
    const newValue = e.target.value;
    this.setState({
      phone: { value: newValue, valid: this.validatePhone(newValue) }
    });
  };

  validatePhone = x => {
    let minimalPhoneLength = 9;
    return x.length >= minimalPhoneLength;
  };

  handleEmailChange = e => {
    const newValue = e.target.value;
    this.setState({
      email: { value: newValue, valid: this.validateEmail(newValue) }
    });
  };

  validateEmail = x => {
    return validator.isEmail(x);
  };

  handleEmailConfChange = e => {
    const newValue = e.target.value;
    this.setState({
      emailConf: { value: newValue, valid: this.validateEmailConf(newValue) }
    });
  };

  validateEmailConf = x => {
    return validator.isEmail(x) && x === this.state.email.value;
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

  handlePlastaIdChange = e => {
    const newValue = e.target.value;
    this.setState({
      plastaId: {
        value: e.target.value,
        valid: this.validatePlastaId(newValue)
      }
    });
  };

  validatePlastaId = x => {
    // Checking if the Plasta ID contains numbers, letters, and has a length of at least 7 characters
    return x.match(/[a-z]/g) && x.match(/[0-9]/g) && x.length >= 7;
  };

  handleSubmit = async (e, appContainer, history, displayError) => {
    try {
      e.preventDefault();
      const x = await signupQuery(
        this.state.firstName.value,
        this.state.lastName.value,
        this.state.email.value,
        this.state.phone.value,
        this.state.password.value,
        this.state.plastaId.value,
        history
      );
      this.openDialog();
    } catch (err) {
      console.log(err.response);
      displayError(err.response.data.msg);
    }
  };
}

export default UpContainer;
