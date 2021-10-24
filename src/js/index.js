import "../css/index.css";

import IssPositionLoop from "./iss-position-loop.js";

class App {
  constructor() {}

  init() {
    window.addEventListener("load", () => {
      const issPositionLoop = new IssPositionLoop;
      issPositionLoop.init();
    });
  };
}

new App().init()
