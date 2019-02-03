import { Container } from 'unstated';
import { signinQuery } from 'js/data';

class AppContainer extends Container {

  state = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')) : 
  {
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    user: null,
    accessToken: null,
    verified: null,
    plastaId: null,
    formDone: null,
  }

  signin = (user, password, history, from) => {
    signinQuery(user, password)
      .then(x => {
        console.log(x.data)
        this.setState({
          user: user,
          accessToken: x.data.access_token,
          firstName: x.data.firstName,
          lastName: x.data.lastName,
          email: x.data.email,
          phone: x.data.phone,
          verified: x.data.verified,
          plastaId: x.data.plastaId,
          formDone: x.data.formDone,
          surveyId: x.data.surveyId,
        }).then(_ => {
          localStorage.setItem('appState', JSON.stringify(this.state))
          if (from) {
            history.push(from.pathname)
          } else {
            history.push("/")
          }
        })
      }).catch(err => {
        console.log(err.response);
      })
  }

}

export default AppContainer;