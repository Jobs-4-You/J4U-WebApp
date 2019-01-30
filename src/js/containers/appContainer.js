import { Container } from 'unstated';
import { signinQuery } from 'js/data';

class AppContainer extends Container {

  state = {
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

  signin = (user, password, history) => {
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
        })
      }).catch(err => {
        console.log(err.response);
      })
  }

}

export default AppContainer;