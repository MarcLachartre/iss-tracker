import RetrieveIssPosition from "./retrieve-iss-position.js";

export default class IssTracking extends RetrieveIssPosition {
  constructor() {
    super();
    this.events = [[document, "keyup"], [document.querySelector(".surface-map").querySelector(".button"), "click"], [window, "focus"]]; //Events on which the app sarts tracking the iss.
  }

  init() { 
    this.design.initMap();
    (this.device.isMobileDevice()) ? this.mobileInit() : this.computerInit();
  }

  computerInit() {
    const alertBoxIsPresent = () => {return document.querySelector(".alert-box") !== null};
    this.design.showAlertBox("fusee", "Hello Space Enthusiast !!!", 'Press your space bar or click the "LOCATE" button to see where the International Space Station currently is!', "GOT IT", "/fusee.png", "fusee", this.startFetchLoop.bind(this), 0);
    document.querySelector(".alert-box").style.backgroundColor = "red";
    this.events.forEach(event => {      
      event[0].addEventListener(event[1], (e) => {    
        const isValidInput = () => { return (e.code === "Space" || e.code === "Enter" || e.type === "click")};
        if (isValidInput() && alertBoxIsPresent()) {
          this.startFetchLoop(0);
        };
      });
    });
  }

  mobileInit() {

    const alertBoxIsPresent = () => {return document.querySelector(".alert-box") !== null};
    this.device.initOrientationMarker();

    this.design.showAlertBox("fusee", "Hello Space Enthusiast !!!", 'Click the "LOCATE" button to see where the International Space Station currently is!', "GOT IT", "/fusee.png", "fusee", this.startFetchLoop.bind(this), 0);

    this.initOrientationDisplay();
    console.log(window.orientation)
    window.addEventListener("orientationchange", () => {
      if (alertBoxIsPresent() !== false && document.querySelector("#rotate") === null) {
        // console.log(window.orientation)
        // return

      } else if (document.querySelector(".container").getAttribute("orientation") === "portrait") {
        this.design.showAlertBox("rotate", "Hey Astronaut !!!", "Please rotate your device, this application can only function in landscape mode!", null, "/phone-rotation.png", "phone-rotation");
        // console.log(window.orientation)
      } else {
        this.startFetchLoop(0);
      }    
    });
  }

  async startFetchLoop(timer) { // we want our app to be able to track the ISS for two minutes with a refresh time of 1s. In other words, every second for 2minutes, the app will place the ISS on the map. After 2 minutes a message will ask if the user is stil on the page. if connection is lost, a message asks the user to check his connection, It also checks on input that the device is correctly orientated. fetch loop is set with a timer, the Design object necessary to show the iss on the map, and the events it has to listen to in order to reset itself.
    this.design.showIss();
    this.design.removeAlertBox();

    await super.placeIssOnMap(); // initial placement of the iss on the map  
    const fetchCount = [];
    const functionExecutionCount = [];

    const interval = setInterval(() => {

      if (document.querySelector(".container").getAttribute("orientation") === "portrait") {
        this.design.hideIss();
        clearInterval(interval)
      }

      if ((timer/10)%1 === 0) { // every second it is refreshing and fetching/placing the ISS on the map
        this.locateIss(interval, fetchCount, functionExecutionCount);
      };
      
      if (timer === 0) { // add eventListener (only once) so that if the user focuses back on the page or presses any key or the spot iss button, it restarts the interval and also visually spots the iss on the map.
        const timeOutId = this.design.spotISS();
        const handler = () => {
          timer = 0;
          this.design.stopSpotISS(timeOutId);
          
          document.querySelector(".surface-map").querySelector(".button").removeEventListener("click", handler, true);
          window.removeEventListener("keyup", handler, true);
          window.removeEventListener("focus", handler, true);
          window.removeEventListener("orientationchange", handler, true);
        };
    
        document.querySelector(".surface-map").querySelector(".button").addEventListener("click", handler, true); 
        window.addEventListener("keyup", handler, true);
        window.addEventListener("focus", handler, true);
        window.addEventListener("orientationchange", handler, true);
      } else if (timer >= 1200) { // after 2minutes, the interval stops, iss icon is hidden, no more fetch is done, and a alert box prompts the user to decide whether or not he wants to keep tracking the ISS.
        this.end(interval);
      };

      timer++
    }, 100);
  }

  locateIss(interval, fetchCount, functionExecutionCount) {
    functionExecutionCount.push("count");

    super.placeIssOnMap().catch(response => { // if fetch fails it stops the loop. 
        clearInterval(interval);
        fetchCount.push("error");
        throw Error(response.message);
      
    }).then(() => {
      fetchCount.push("success");
      return
    })

    if ((functionExecutionCount.length - fetchCount.length) >= 3) { //if the connection is lost close to the end of the interval,set interval loop restarts before the server sends the error (I believe). Thats why we implemented the following, if we don't get an answer within one second, the user has to check his connection. If there is a count difference of 2, it means the loop missed one fetch response.
      this.design.showAlertBox("wormhole", "Hey Astronaut !!!", "Houston here. It seems that you are lost in a wormhole... Please check your connection and retry!", "RETRY", "/wormhole.png", "trounoir", this.startFetchLoop.bind(this), 0);  
      this.design.hideIss();
      super.initOrientationDisplay()
      clearInterval(interval);
    }
  }

  end(interval) {
    clearInterval(interval);
    this.design.showAlertBox("astronaut", "Hey Astronaut !!!", "Houston here. Are you still with us or are you lost in space? Do you copy?", "STILL HERE", "/astronaut.png", "astronaut", this.startFetchLoop.bind(this), 0);
    this.design.hideIss();
    super.initOrientationDisplay();
  }
}
