import { Container } from 'unstated';
import { recomQuery, searchQuery, secoQuery, trackQuery, locationsQuery } from 'js/data';

/*  As we return 20 job group recommendations,
    we initialize currentPage and totalSeco arrays with this number of integers
    currentPage needs to be initialized as 1 to work correctly
    totalSeco gets its value replaced as soon as SECO results are returned
*/

let recomCount = 20;
let currentPage = Array.from(new Array(recomCount), () => 1);
let totalCounts = Array.from(new Array(recomCount), () => 100);
let loadingSeco = Array.from(new Array(recomCount), () => false);

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
    totalCounts: [],
    selectedJob: null,
    loadingSeco: loadingSeco,
    currentPage: currentPage,
    totalCounts: totalCounts,
    applied: false
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
  
  handleLocations = async (value, displayError) => {
    try {
      const res = await locationsQuery(value);
      const options = res.data.map(v => {
        return {
          label: v.localities.city,
          value: v.localities.communalCode
        };
      });
      return options;
    } catch (err) {
      console.log(err.response.data.msg);
      displayError(err.response.data.msg);
    }
  };
  

  secoSearch = async (recomContainer, avamList, i, displayError) => {

    // Updating the loader status for only one job title
    const { loadingSeco } = this.state;
    loadingSeco[i] = true;
    
    this.setState({ loadingSeco: loadingSeco });
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
      const res = await secoQuery(professionCodes, recomContainer.state.currentPage[i]);
      const newPos = this.state.openPositions;
      const counts = this.state.totalCounts;
      newPos[i] = res.data.positions;
      counts[i] = parseInt(res.data.totalCount) ? parseInt(res.data.totalCount) : 0;
      loadingSeco[i] = false;
      await this.setState({
        openPositions: newPos,
        totalCounts: counts,
        loadingSeco:loadingSeco
      });
    } catch (err) {
      loadingSeco[i] = false
      this.setState({ loadingSeco: loadingSeco });
      console.log(err.response.data.msg);
      displayError(err.response.data.msg);
    }
  }

  setSelectedJob = async (recomContainer, selectedJobObject) => {
    try {
      await recomContainer.setState({
        selectedJob: selectedJobObject
      });
      const rest = await trackQuery({
        TYPE: 'JOB_CLICK',
        id: selectedJobObject.id,
        occupations: selectedJobObject.occupations,
        timestamp: Date().toLocaleString()
      });
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

  handleJobApplication = async (data) => {
    try {
      const rest = await trackQuery(data);
    } catch (err) {
      this.setState({ loading: false });
      console.log(err);
    }
  };

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
        openPositions: Array.apply(null, Array(res.data.isco08.length)),
        totalCounts: Array.apply(null, Array(res.data.isco08.length))
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
