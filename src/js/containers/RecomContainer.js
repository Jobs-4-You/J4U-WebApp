import { Container } from 'unstated';
import { recomQuery } from 'js/data';

class RecomContainer extends Container {

  state = {
    oldJobValue: null,
    oldJobInput: '',
    alpha: 0.5,
    beta: 0.5,
    jobs: null,
    importance: null,
    vars: null
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
    this.setState({ alpha: (value / 100).toFixed(2) });
  }

  setBeta = (_, value) => {
    this.setState({ beta: (value / 100).toFixed(2) });
  }

  recommend = (accessToken) => {
    const { oldJobValue, alpha, beta } = this.state;
    recomQuery({
      oldJobValue,
      alpha,
      beta,
    }, accessToken).then(res => {
      console.log(res.data);
      this.setState({
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