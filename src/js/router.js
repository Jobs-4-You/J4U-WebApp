import { createHashHistory } from 'history';
import { logPageView } from 'js/tracking';

const history = createHashHistory();

const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
  logPageView(location.pathname)
});

export default history;