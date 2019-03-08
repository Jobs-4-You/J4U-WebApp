import { Container } from 'unstated';
import { recomQuery, searchQuery, secoQuery } from 'js/data';

class RecomContainer extends Container {
  state = {
    search: "",
    jobs: null,
    isco08: null,
    avam: null,
    bfs: null,
    vars: null,
    loading: false,
    openPositions: [],
  };

  handleSearch = async (value, displayError) => {
    try {
      const res = await searchQuery(value);
      const options = res.data.map(v => {
        return {
          label: v.Title,
          value: v.ISCO08
        };
      });
      return options;
    } catch (err) {
      console.log(err.response.data.msg);
      displayError(err.response.data.msg);
    }
  };

  secoSearch = async (recomContainer, avamList, i) => {
    let professionCodes = [];
    // Preparing the list of profession codes as SECO's API expects
    for (let index = 0; index < avamList.length; index++) {
      professionCodes.push(
        {
          "type": "AVAM",
          "value": avamList[index]
        }
      );
    }
    try {
      const positions = await secoQuery(professionCodes);
      const newPos = this.state.openPositions;
      newPos[i] = positions
      await this.setState({
        openPositions: newPos
      });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  }

  recommend = async (appContainer, displayError) => {
    try {
      const { oldJobValue, oldJobLabel, alpha, beta } = appContainer.state;
      await this.setState({ loading: true });
      const res = await recomQuery({
        oldJobValue,
        oldJobLabel,
        alpha,
        beta
      });
      await this.setState({
        loading: false,
        vars: res.data.vars,
        jobs: res.data.jobs,
        isco08: res.data.isco08,
        avam: res.data.avam,
        bfs: res.data.bfs,
        openPositions: Array.apply(null, Array(res.data.isco08.length))
      });
      appContainer.cacheState();
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
      displayError(err.response.data.msg);
    }
  };
}

export default RecomContainer;
