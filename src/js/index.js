import "../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "../css/index.css";
import IssTracking from "./iss-tracking.js";

class App {
  constructor() {}

  init() {
    window.addEventListener("load", () => {
      const issTracking = new IssTracking();
      issTracking.init();
    });
  };
}

new App().init();
