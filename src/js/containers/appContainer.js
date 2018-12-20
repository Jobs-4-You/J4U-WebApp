import { Container } from 'unstated';
import { signinQuery } from 'js/data';

class AppContainer extends Container {

  state = {
    user: null,
    accessToken: null,
  }

  signin = (user, password, history) => {
    signinQuery(user, password)
      .then(x => {
        console.log(x.data)
        this.setState({
          user: user,
          accessToken: x.data.access_token,
        })
      }).catch(err => {
        console.log(err.response);
      })
  }

}

export default AppContainer;