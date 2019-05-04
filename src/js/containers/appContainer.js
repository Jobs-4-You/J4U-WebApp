import { Container } from "unstated";
import {
  signinQuery,
  linkQuery,
  userInfosQuery,
  sendVerificationQuery
} from "js/data";
import history from "js/router";

localStorage.clear();

class AppContainer extends Container {
  state = localStorage.getItem("appState")
    ? JSON.parse(localStorage.getItem("appState"))
    : {
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
        blocked: null
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

  signin = async (user, password, history, from, displayError, updateContainer) => {
    try {
      const x = await signinQuery(user, password);
      console.log(x.data);
      await this.setState({
        ...x.data
      });
      updateContainer.init(this)
      this.cacheState();
      localStorage.setItem("accessToken", x.data.accessToken);
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
    });
  };

  setAlpha = (_, value) => {
    this.setState({ alpha: value });
  };

  setBeta = (_, value) => {
    this.setState({ beta: value });
  };
}

export default AppContainer;
