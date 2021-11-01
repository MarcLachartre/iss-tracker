import "../../node_modules/@fortawesome/fontawesome-free/css/fontawesome.css";
import "../../node_modules/@fortawesome/fontawesome-free/css/solid.css";
import "../css/index.css";

import Button from "../html/components/button.html";
import Satellite from "../html/components/satellite.html";

import IssTracking from "./iss-tracking.js";

class App {
  constructor() {}

  init() { // insert HTML components and then inits the iss tracking js file.
    window.addEventListener("load", () => {
      this.insertHTML();

      const issTracking = new IssTracking();
      issTracking.init();
    });
  };

  insertHTML() {
    document.querySelector(".surface-map").insertAdjacentHTML('beforeend', Satellite);
    document.querySelector(".surface-map").insertAdjacentHTML('beforeend', Button);
  }
}

new App().init();
