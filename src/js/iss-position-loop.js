import Design from "./design.js"
import Device from "./device.js"

export default class IssPositionLoop {
  constructor() {
    this.events = [[document, "keyup"], [document.querySelector(".surface-map").querySelector(".button"), "click"], [window, "blur"]]; //Events on which the app sarts tracking the iss.
  }

  init() { // we want our app to be able to track the ISS for two minutes with a refresh time of 1s. In other words, every second for 2minutes, the app will place the ISS on the map. After 2 minutes a message will ask if the user is stil on the page.
    const design = new Design();
    const device = new Device();
    // const events = [[document, "keyup"], [document.querySelector(".surface-map").querySelector(".button"), "click"], [window, "focus"]]; //Events on which the app sarts tracking the iss.

    design.showAlertBox("fusee", "Hello Space Enthusiast !!!", 'Press your space bar or click the "LOCATE" button to see where the International Space Station currently is!', "GOT IT", "/fusee.png", "fusee", this.fetchLoop.bind(this), [0, design, this.events]);

    this.events.forEach(event => {   
      
      event[0].addEventListener(event[1], (e) => {
         
        const isValidInput = () => { return (e.code === "Space" || e.code === "Enter") }
        const alertIsPresent = () => {return document.querySelector(".alert-box") !== null}
  
        const startFetchLoop = () => {
          design.removeAlertBox();
          this.fetchLoop(0);
        
        }

        console.log((isValidInput() && device.isPortrait() && alertIsPresent() && document.querySelector("#rotate") === null))
        // if (isValidInput() && device.isPortrait() && alertIsPresent() && document.querySelector("#rotate") === null) {

        //   design.showRotateDeviceAlert();
        // }

        (isValidInput() && alertIsPresent() && device.isPortrait() === false) ? startFetchLoop() : false;

      });
    });

    if (device.isMobileDevice()) {
      design.rotateDeviceOnResize(this.fetchLoop.bind(this), 0);
    };
  }

  async fetchLoop(timer) { //fetch loop is set with a timer, the Design object necessary to show the iss on the map, and the events it has to listen to in order to reset itself.
    const design = new Design();
    await this.placeIssOnMap(design); // initial placement of the iss on the map  
    design.spotISS();

    const fetchCount = [];
    const functionExecutionCount = [];

    const device = new Device();
    const interval = setInterval(() => {

      if (device.isPortrait() && device.isMobileDevice()) {
        clearInterval(interval);
        design.showRotateDeviceAlert();
      }

      if ((timer/10)%1 === 0) { // every second it is refreshing and fetching/placing the ISS on the map
          
        functionExecutionCount.push("count");

        this.placeIssOnMap(design)
        .catch(response => { // if fetch fails it stops the loop. 
          if (response.message === "false") {
            clearInterval(interval);
            fetchCount.push("error");
            throw Error(response.message);
          }
        }).then(() => {
          fetchCount.push("success");
          return
        })

        if ((functionExecutionCount.length - fetchCount.length) >= 3) { //if the connection is lost close to the end of the interval,set interval loop restarts before the server sends the error. Thats why we implemented the following, if we don't get an answer within one second, the user has to check his connection. If there is a count difference of 2, it means the loop missed one fetch response.
          design.showAlertBox("wormhole", "Hey Astronaut !!!", "Houston here. It seems that you are lost in a wormhole... Please check your connection and retry!", "RETRY", "/wormhole.png", "trounoir", this.fetchLoop.bind(this), [0, design]);  
          design.hideIss();
          clearInterval(interval);
        }
      }
      
      if (timer === 0) { // add eventListener (only once) so that if the user presses spacebar or the spot iss button, it restarts the interval and also visually spots the iss on the map.
        design.showIss();

        const restartLoopHandler = (e) => {
          if (e.code === "Space" || e.code === "Enter" || e.type === "click" || e.type === "focus") { 
            design.spotISS();
            timer = 0; 
          }
        }

        if (document.querySelector(".container").hasAttribute("listeners-added") === false) {
          document.querySelector(".container").setAttribute("listeners-added", true);

          this.events.forEach(event => {
            event[0].addEventListener(event[1], (e) => { restartLoopHandler(e) }, false) 
          })
        }
      }

      if (timer >= 1200) { // after 2minutes, the interval stops, no more fetch is done, and a alert box prompts the user to decide whether or not he wants to keep tracking the ISS.
        clearInterval(interval);
        design.showAlertBox("astronaut", "Hey Astronaut !!!", "Houston here. Are you still with us or are you lost in space? Do you copy?", "STILL HERE", "/astronaut.png", "astronaut", this.fetchLoop.bind(this), [0, design, events]);
        design.hideIss();
      };

      timer++
    },100);
  }

  placeIssOnMap(design) { // fetches coordinates, converts then in position on screen, place an iss icon on the map.
    return new Promise((success, reject) => { 
      this.fetchPosition(success, reject);
    })
    .catch((e)=> {
      if (document.querySelector(".alert-box") === null) {
        design.showAlertBox("wormhole", "Hey Astronaut !!!", "Houston here. It seems that you are lost in a wormhole... Please check your connection and retry!", "RETRY", "/wormhole.png", "trounoir", this.fetchLoop.bind(this), [0, design]);  
        design.hideIss();
      }
        throw Error(false);
    })
    .then((coordinates) => {
      return this.positionOnMap(coordinates);
    })
  }

  fetchPosition(success, reject) { // retrieves the iss coordinates
      var myInit = {method: 'GET'};

      fetch('https://api.wheretheiss.at/v1/satellites/25544.json', myInit)      
      .catch(response => {
        if (!response.ok) {
          reject("false");
          throw(Error(response)) 
        }
        return response;
      })
      .then((response) => {
        return response.json();
      })
      .then(res => {
        success({latitude: res.latitude, longitude: res.longitude}); 
      })
  }

  positionOnMap(coordinates) { //converts the fetched coordinates of the iss into position on screen. With css top and left, we first placed the iss precisely on the center OF THE MAP, then with a cross product, we can place the iss as if we had an axis.
    const longitude = Number(coordinates.longitude);
    const latitude = Number(coordinates.latitude);
 
    const convertedLatitude = this.convertCoordinates(-latitude, 60, 90, 59.9, 96.8, 4.8);
    const convertedLongitude = this.convertCoordinates(longitude, 180, 180, 45, 94, -4);

    document.querySelector(".satellite").style.top = `${convertedLatitude}%`;
    document.querySelector(".satellite").style.left = `${convertedLongitude}%`;
    const convertedCoord = {lat: convertedLatitude, lon: convertedLongitude};

    return convertedCoord
  }

  convertCoordinates(coord, minCoord, maxCoord, centerAxis, maxAxis, minAxis) { // Here's the cross product used to convert the coordinates fetched so that we can position the little ISS icon on the map with css left and top properties. (cross product, produit en croix)
    if (coord < 0) {
      const convertedCoord = centerAxis + ((coord*(centerAxis-minAxis))/maxCoord);
      return convertedCoord
    } else if (coord > 0) {
      const convertedCoord = centerAxis + ((coord*(maxAxis-centerAxis))/minCoord);
      return convertedCoord
    }
  }
}