import { Container } from "unstated";
import {
  signinQuery,
  linkQuery,
  userInfosQuery,
  sendVerificationQuery,
  updateCompletionQuery,
  checkCompletionQuery
} from "js/data";
import { logSessionTime } from "js/tracking";
import history from "js/router";

class AppContainer extends Container {
  state = localStorage.getItem("appState")
    ? JSON.parse(localStorage.getItem("appState"))
    : {
        civilite: null,
        firstName: null,
        lastName: null,
        birthDate: null,
        email: null,
        phone: null,
        accessToken: null,
        refreshToken: null,
        verified: null,
        plastaId: null,
        formDone: null,
        alpha: 50,
        beta: 50,
        oldJobValue: null,
        oldJobLabel: null,
        drawerIsOpen: false,
        blocked: null,
        fixedOldJobValue: null,
        fixedAlphaBeta: null,
        loading: false,
        verifData: []
      };

  cacheState = () => {
    //localStorage.setItem("appState", JSON.stringify(this.state));
    return;
  };

  openDrawer = () => {
    this.setState({
      drawerIsOpen: true
    });
  };

  closeDrawer = () => {
    this.setState({
      drawerIsOpen: false
    });
  };

  getInfos = async displayError => {
    try {
      const x = await userInfosQuery();
      await this.setState({
        ...x.data
      });
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  signin = async (
    user,
    password,
    history,
    from,
    displayError,
    updateContainer,
    recomContainer
  ) => {
    try {
      const x = await signinQuery(user, password);
      console.log(x.data);
      await this.setState({
        ...x.data
      });
      updateContainer.init(this);
      this.cacheState();
      localStorage.setItem("accessToken", x.data.accessToken);
      if (this.state.oldJobLabel && this.state.oldJobValue) {
        recomContainer.setValue({
          label: this.state.oldJobLabel,
          value: this.state.oldJobValue
        });
      }

      console.log(`CURRENT SESSION TIME`, localStorage.getItem("sessionTime"));
      await logSessionTime();
      const freq = 1000;
      localStorage.setItem("sessionTime", 0);
      setInterval(function() {
        const currentSessionTime = parseFloat(
          localStorage.getItem("sessionTime")
        );
        localStorage.setItem("sessionTime", currentSessionTime + freq);
      }, freq);

      if (from) {
        history.push(from.pathname);
      } else {
        history.push("/");
      }
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  link = async displayError => {
    try {
      this.setState({ loading: true });
      const res = await linkQuery();
      this.cacheState();
      if (res.data.success === true) {
        await this.setState({ formDone: true });
        this.cacheState();
      } else {
        alert(
          "Malheureusement, nous n'avons pas pu associer votre compte. Veuillez compléter le formulaire jusqu'au bout puis réessayez."
        );
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  updateCompletion = async displayError => {
    try {
      this.setState({ loading: true });
      const res = await updateCompletionQuery();
      this.cacheState();
      if (res.data.success === true) {
        await this.setState({ formDone: true });
        await this.checkCompletion();
        this.cacheState();
      } else {
        alert(
          "Malheureusement, nous n'avons pas pu associer votre compte. Veuillez compléter le formulaire jusqu'au bout puis réessayez."
        );
      }
      this.setState({ loading: false });
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  checkCompletion = async displayError => {
    try {
      const res = await checkCompletionQuery();
      this.cacheState();
      this.setState({ verifData: res.data });
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  sendVerification = async displayError => {
    try {
      const res = await sendVerificationQuery();
      this.cacheState();
    } catch (err) {
      console.log(err);
      displayError(err.response.data.msg);
    }
  };

  setOldJobValue = job => {
    this.setState({
      oldJobValue: job.value,
      oldJobLabel: job.label
    }).then(_ => console.log(this.state.oldJobValue));
  };

  setAlpha = (_, value) => {
    this.setState({ alpha: value });
  };

  setBeta = (_, value) => {
    this.setState({ beta: value });
  };
}

export default AppContainer;
