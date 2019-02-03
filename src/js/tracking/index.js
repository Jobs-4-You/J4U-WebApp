import { trackQuery } from 'js/data';

export function logPageView(path) {
  const user = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')) : null;

  if (!user) {
    return
  }

  const data = {
    TYPE: 'PAGE_VIEW',
    USER: user.email,
    PAGE: path,
  }

  trackQuery(data, user.accessToken);
}