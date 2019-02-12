import { Container } from 'unstated';
import { recomQuery, searchQuery } from 'js/data';

class RecomContainer extends Container {

  state = {
    search: '',
    oldJobValue: null,
    alpha: 50,
    beta: 50,
    jobs: null,
    codes: null,
    vars: null,
    loading: false,
  }

  setOldJobValue = (job) => {
    this.setState({
      oldJobValue: job.value,
    });
  }

  setOldJobInput = (value, { action }) => {
    if (action !== 'input-blur' && action !== 'menu-close' && action !== 'set-value')
      console.log(value, action, '______')
      console.log(value.label, action, '______')
      this.setState({ oldJobInput: value.label });
  }

  setAlpha = (_, value) => {
    this.setState({ alpha: value });
  }

  setBeta = (_, value) => {
    this.setState({ beta: value });
  }

  handleSearch = (value, accessToken) => {
    return searchQuery(value, accessToken).then(res => {
      console.log(JSON.stringify(res.data))
      const options = res.data.map(v => {
        return {
          label: v.Title,
          value: v.ISCO08,
        }
      });
      return options;
    });
  }

  recommend = async (accessToken) => {
    const { oldJobValue, alpha, beta } = this.state;
    await this.setState({ loading: true });
    recomQuery({
      oldJobValue,
      alpha,
      beta,
    }, accessToken).then(res => {
      console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      console.log(res.data)
      console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      this.setState({
        loading: false,
        vars: res.data.vars,
        jobs: res.data.jobs,
        codes: res.data.codes,
      })
    }).catch(err => {
      console.log(err);
    })
  }
}

export default RecomContainer;