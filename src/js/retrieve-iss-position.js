import Design from "./design.js"
import Device from "./device.js"

export default class RetrieveIssPosition {
  constructor() {
    this.design = new Design();
    this.device = new Device();
  }

  initOrientationDisplay() {
    document.querySelector(".alert-box").querySelector(".button").addEventListener("click", () => {
      if (document.querySelector(".container").getAttribute("orientation") === "portrait") {
        this.design.showAlertBox("rotate", "Hey Astronaut !!!", "Please rotate your device, this application can only function in landscape mode!", null, "/phone-rotation.png", "phone-rotation");
      }
    })
  }

  placeIssOnMap() { // fetches coordinates, converts then in position on screen, place an iss icon on the map.
    var myInit = {method: 'GET'};

    return fetch('https://api.wheretheiss.at/v1/satellites/25544.json', myInit)      
    .catch(response => {
     
        if (document.querySelector(".alert-box") === null) {
          this.design.showAlertBox("wormhole", "Hey Astronaut !!!", "Houston here. It seems that you are lost in a wormhole... Please check your connection and retry!", "RETRY", "/wormhole.png", "trounoir", this.startFetchLoop.bind(this), 0);  
          this.design.hideIss();
          this.initOrientationDisplay()
        throw(Error(response)) 
      }
    })
    .then((response) => {
      return response.json();
    })
    .then(res => {
      const coordinates = {latitude: res.latitude, longitude: res.longitude};
      return this.positionOnMap(coordinates);
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
