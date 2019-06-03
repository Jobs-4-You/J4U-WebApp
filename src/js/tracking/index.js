import { trackQuery } from "js/data";

export function logPageView(path) {
  const data = {
    TYPE: "PAGE_VIEW",
    PAGE: path
  };

  trackQuery(data);
}

export async function logSessionTime() {
  const sessionTime = localStorage.getItem("sessionTime");

  console.log(`SESSION TIME ${sessionTime}`);

  if (!sessionTime) {
    console.log("NO PREVIOUS TIME");
    return;
  }

  console.log("PREVIOUS TIME LOGGING");

  const data = {
    TYPE: "SESSION_TIME",
    SESSION_TIME: sessionTime
  };

  await trackQuery(data);
}
