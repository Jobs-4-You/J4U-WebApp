import { Container } from 'unstated';
import { signinQuery, linkQuery } from 'js/data';
import history from 'js/router';

class AppContainer extends Container {

  state = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')) :
    {
      firstName: null,
      lastName: null,
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
    }

  cacheState = () => {
    localStorage.setItem('appState', JSON.stringify(this.state))
  }

  signin = (user, password, history, from, displayError) => {
    signinQuery(user, password)
      .then(x => {
        console.log(x.data)
        this.setState({
          ...x.data,
        }).then(_ => {
          this.cacheState();
          if (from) {
            history.push(from.pathname)
          } else {
            history.push("/")
          }
        })
      }).catch(err => {
        console.log(err);
        displayError(err.response.data.msg);
      })
  }

  link = () => {
    linkQuery().then(res => {
      if (res.data.success === true) {
        this.setState({ formDone: true }).then(_ => {
          this.cacheState();
        });
      } else {
        alert("Malheureusement nous n'avons pas pu link votre compte. Veuillez compléter le formulaire Qualtrics jusq'au bout puis ré-essayer")
      }
    })
  }

  setOldJobValue = (job) => {
    this.setState({
      oldJobValue: job.value,
      oldJobLabel: job.label,
    });
  }

  setAlpha = (_, value) => {
    this.setState({ alpha: value });
  }

  setBeta = (_, value) => {
    this.setState({ beta: value });
  }

}

export default AppContainer;