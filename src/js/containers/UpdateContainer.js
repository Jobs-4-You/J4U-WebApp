import { Container } from "unstated";
import validator from "validator";
import { updateQuery } from "js/data";

class UpContainer extends Container {
  state = {
    dialogOpen: false,
    civilite: {
      value: "",
      valid: false
    },
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
    plastaId: {
      value: "",
      valid: false
    },
    birthdate: {
      value: "",
      valid: false
    }
  };

  init = appContainer => {
    this.setState({
      civilite: {
        value: appContainer.state.firstName,
        valid: true
      },
      firstName: {
        value: appContainer.state.firstName,
        valid: true
      },
      lastName: {
        value: appContainer.state.lastName,
        valid: true
      },
      phone: {
        value: appContainer.state.phone,
        valid: true
      },
      email: {
        value: appContainer.state.email,
        valid: true
      },
      emailConf: {
        value: appContainer.state.email,
        valid: true
      },
      plastaId: {
        value: appContainer.state.plastaId,
        valid: true
      },
      birthdate: {
        value: appContainer.state.birthDate,
        valid: true
      }
    });
  };

  get valid() {
    const s = Object.keys(this.state);
    return s
      .slice(1, s.length)
      .map(x => this.state[x].valid)
      .reduce((acc, curr) => acc && curr);
  }

  handleCiviliteChange = e => {
    const newValue = e.target.value;
    this.setState({
      civilite: { value: newValue, valid: true }
    });
  };

  handleFNameChange = e => {
    const newValue = e.target.value;
    this.setState({
      firstName: { value: newValue, valid: this.validateFName(newValue) }
    });
  };

  validateFName = x => {
    return validator.isAlpha(x) || x;
  };

  handleLNameChange = e => {
    const newValue = e.target.value;
    this.setState({
      lastName: { value: newValue, valid: this.validateLName(newValue) }
    });
  };

  validateLName = x => {
    return validator.isAlpha(x) || x;
  };

  handleBirthdateChange = e => {
    const newValue = e.target.value;
    this.setState({
      birthdate: { value: newValue, valid: this.validateBirthdate(newValue) }
    });
  };

  validateBirthdate = x => {
    // Chosen date must be inferior or equal to (today - 18 years)
    return new Date(x) <= Date.now() - 567993600000 || x;
  };

  handlePhoneChange = e => {
    const newValue = e.target.value;
    this.setState({
      phone: { value: newValue, valid: this.validatePhone(newValue) }
    });
  };

  validatePhone = x => {
    let minimalPhoneLength = 9;
    return x.length >= minimalPhoneLength || x;
  };

  handleEmailChange = e => {
    const newValue = e.target.value;
    this.setState({
      email: { value: newValue, valid: this.validateEmail(newValue) }
    });
  };

  validateEmail = x => {
    return validator.isEmail(x) || x;
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
    return (
      (x.match(/[a-z]/g) || x.match(/[A-Z]/g)) &&
      x.match(/[0-9]/g) &&
      x.length >= 7
    );
  };

  handleSubmit = async (e, appContainer, history, displayError) => {
    try {
      e.preventDefault();
      const x = await updateQuery(
        this.state.civilite.value,
        this.state.firstName.value,
        this.state.lastName.value,
        this.state.email.value,
        this.state.phone.value,
        this.state.plastaId.value,
        new Date(this.state.birthdate.value).toISOString().slice(0, 19).replace('T', ' '),
        history
      );
      history.push('/logout')
    } catch (err) {
      console.log(err.response);
      displayError(err.response.data.msg);
    }
  };
}

export default UpContainer;
