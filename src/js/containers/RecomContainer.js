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
    locationValue: "NE",
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

  setLocation = location => {
    this.setState({
      locationValue: location.value
    });
  };

  handleLocations = async (searched, displayError) => {
    try {

      let arr = [{label:"Tous les cantons",value:""},{label:"Argovie (AG)",value:"AG"},{label:"Appenzell Rhodes-Intérieures (AI)",value:"AI"},{label:"Appenzell Rhodes-Extérieures (AR)",value:"AR"},{label:"Berne (BE)",value:"BE"},{label:"Bâle-Campagne (BL)",value:"BL"},{label:"Bâle-Ville (BS)",value:"BS"},{label:"Fribourg (FR)",value:"FR"},{label:"Genève (GE)",value:"GE"},{label:"Glaris (GL)",value:"GL"},{label:"Grisons (GR)",value:"GR"},{label:"Jura (JU)",value:"JU"},{label:"Lucerne (LU)",value:"LU"},{label:"Neuchâtel (NE)",value:"NE"},{label:"Nidwald (NW)",value:"NW"},{label:"Obwald (OW)",value:"OW"},{label:"Saint-Gall (SG)",value:"SG"},{label:"Schaffhouse (SH)",value:"SH"},{label:"Soleure (SO)",value:"SO"},{label:"Schwytz (SZ)",value:"SZ"},{label:"Thurgovie (TG)",value:"TG"},{label:"Tessin (TI)",value:"TI"},{label:"Uri (UR)",value:"UR"},{label:"Vaud (VD)",value:"VD"},{label:"Valais (VS)",value:"VS"},{label:"Zoug (ZG)",value:"ZG"},{label:"Zurich (ZH)",value:"ZH"}];
      return arr;

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
      const res = await secoQuery(professionCodes, recomContainer.state.currentPage[i], recomContainer.state.locationValue);
      const rest = await trackQuery({
        TYPE: 'JOB_GROUP_NAVIGATION',
        PROFESSIONCODES: professionCodes,
        PAGE: recomContainer.state.currentPage[i],
        LOCATION: recomContainer.state.locationValue
      });
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
      console.log(err)
      displayError(err.response || "Une erreur est survenue. Veuillez réessayer.");
    }
  }

  setSelectedJob = async (recomContainer, selectedJobObject) => {
    try {
      await recomContainer.setState({
        selectedJob: selectedJobObject
      });
      const rest = await trackQuery({
        TYPE: 'JOB_CLICK',
        JOBID: selectedJobObject.id,
        OCCUPATIONS: selectedJobObject.occupations
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

  recommend = async (appContainer, recomContainer, displayError) => {
    try {
      const { oldJobValue, oldJobLabel, alpha, beta } = appContainer.state;
      const { locationValue } = this.state;
      await this.setState({ loading: true });
      const res = await recomQuery({
        oldJobValue,
        oldJobLabel,
        locationValue,
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
