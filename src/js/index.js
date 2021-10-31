import "../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "../css/index.css";
import Init from "../html/init.html";
import IssTracking from "./iss-tracking.js";

class App {
  constructor() {}

  init() {
    window.addEventListener("load", () => {
      document.body.innerHTML = Init;
      const issTracking = new IssTracking();
      issTracking.init();
    });
  };
}

new App().init();
