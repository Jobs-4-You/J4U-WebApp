import { Container } from 'unstated';
import { recomQuery, searchQuery } from 'js/data';

class RecomContainer extends Container {

  state = {
    search: '',
    jobs: null,
    codes: null,
    vars: null,
    loading: false,
  }


  handleSearch = (value) => {
    return searchQuery(value).then(res => {
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

  recommend = async (appContainer) => {
    const { oldJobValue, oldJobLabel, alpha, beta } = appContainer.state;
    await this.setState({ loading: true });
    recomQuery({
      oldJobValue,
      oldJobLabel,
      alpha,
      beta,
    }).then(res => {
      console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      console.log(res.data)
      console.log('LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL');
      this.setState({
        loading: false,
        vars: res.data.vars,
        jobs: res.data.jobs,
        codes: res.data.codes,
      });
      appContainer.cacheState();
    }).catch(err => {
      console.log(err);
    })
  }
}

export default RecomContainer;