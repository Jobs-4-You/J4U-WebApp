import { Container } from 'unstated';
import { recomQuery } from 'js/data';

class RecomContainer extends Container {

  state = {
    oldJobValue: null,
    oldJobInput: '',
    alpha: 50,
    beta: 50,
    jobs: null,
    importance: null,
    vars: null,
    loading: false,
  }

  setOldJobValue = (job) => {
    this.setState({
      oldJobValue: job.value,
      oldJobInput: job.value
    });
  }

  setOldJobInput = (value, { action }) => {
    console.log(value, action, '______')
    if (action !== 'input-blur' && action !== 'menu-close' && action !== 'set-value')
      this.setState({ oldJobInput: value });
  }

  setAlpha = (_, value) => {
    this.setState({ alpha: value });
  }

  setBeta = (_, value) => {
    this.setState({ beta: value });
  }

  recommend = async (accessToken) => {
    const { oldJobValue, alpha, beta } = this.state;
    await this.setState({ loading: true });
    recomQuery({
      oldJobValue,
      alpha,
      beta,
    }, accessToken).then(res => {
      console.log(res.data);
      this.setState({
        loading: false,
        vars: res.data.vars,
        jobs: res.data.jobs,
        importance: res.data.importance,
      })
    }).catch(err => {
      console.log(err);
    })
  }


}

export default RecomContainer;