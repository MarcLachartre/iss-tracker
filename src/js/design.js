import Device from "./device.js"
import Map from '../images/world-map.jpeg';

export default class Design {
    constructor(device) {
        this.device = new Device();
        this.satellite = document.querySelector(".satellite");
    }

    initMap() {
        const worldMap = new Image();
        worldMap.src = Map;
        worldMap.alt = "world map";
        worldMap.classList.add("world-map");
        return document.querySelector(".container").appendChild(worldMap);
    }


    showAlertBox(id, title, text, buttonText, imgURL, imgClass, callback, arg) {
        if (document.querySelector(".background") === null) {
            this.addBlurBackground();
            const nodeArray = [];
            const classes = ["background", "alert-box", "alert-box-image", "alert-box-text-container", "alert-box-text", "alert-box-text"]
            
            for (let i = 0; i < 6; i++) {
                if (i < 2 || i > 2 && i < 5) {
                    nodeArray.push(document.createElement("div"));
                } else if (i === 2) {
                    nodeArray.push(document.createElement("img"));
                } else if (i === 5) {
                    nodeArray.push(document.createElement("h1"));
                }
            }

            nodeArray.forEach((node, i) => {  
                node.classList.add(classes[i]);
                if (classes[i] ===  "alert-box-image") {
                    node.setAttribute("src", imgURL);
                    node.setAttribute("alt", "alert-box-image");
                    node.classList.add(imgClass);
                } else if (classes[i] ===  "alert-box-text" && node.nodeName === "H1") {
                    node.innerHTML = title;
                } else if (classes[i] ===  "alert-box-text" && node.nodeName === "DIV") {
                    node.innerHTML = text;
                } else if (classes[i] ===  "alert-box") {
                    node.id = id;
                }
            })

            document.querySelector(".container").appendChild(nodeArray[0]);
            nodeArray[0].appendChild(nodeArray[1]);
            nodeArray[1].appendChild(nodeArray[2]);
            nodeArray[1].appendChild(nodeArray[3]);
            nodeArray[3].appendChild(nodeArray[5]);
            nodeArray[3].appendChild(nodeArray[4]); 

            if (buttonText != null) {
                const button = this.addButton(buttonText, callback, arg);
                nodeArray[3].appendChild(button);
                
            } else {
                document.querySelector("div.alert-box-text").style.height= "100%";
                document.querySelector(".alert-box-text").style.padding= "2%";
                document.querySelector("div.alert-box-text").style.padding= "7% 0";
            }
        }
    }

    addButton(text, callback, arg) {
        const button = document.createElement("div");
        const buttonText = document.createElement("div");

        button.classList.add("button"); 
        buttonText.classList.add("btn-text"); 

        buttonText.innerHTML = text;

        button.appendChild(buttonText);
        this.removeAlertOnclick(button, callback, arg);
        return button
    }

    removeAlertOnclick(button, callback, arg) {
        button.addEventListener("click", () => {
            callback(arg);
            this.removeAlertBox();
        })
    }

    removeAlertBox() {
        if (document.querySelector(".background") !== null) {
            document.querySelector(".background").remove();
            this.removeBlurBackground();
        }
    }

    addBlurBackground() {
        document.querySelector(".world-map").style.filter= "blur(15px)";
        document.querySelector(".button").style.filter= "blur(15px)";
    }

    removeBlurBackground() {
        document.querySelector(".world-map").style.filter= "blur(0px)";
        document.querySelector(".button").style.filter= "blur(0px)";
    }
    

    showRotateDeviceAlert() {
        this.hideIss();
        this.showAlertBox("rotate", "Hey Space Ranger !!!", "Please rotate your device, this application can only function in landscape mode!", null, "/phone-rotation.png", "phone-rotation");
    };

    addRotateDeviceListener(callback, arg) { 
        window.addEventListener("orientationchange", (e) => { // deprecated but still works on mobile, resize event is annoying because it fires twice
            this.rotateDeviceAlertSelector(callback, arg);
        });
    }

    rotateDeviceAlertSelector(callback, arg) {
        if (document.querySelector(".container").getAttribute("orientation") === "portrait") {
            this.removeAlertBox();
            this.showIss();
            callback(arg);
        } else {
            this.showRotateDeviceAlert();
        }
    }

    spotISS() {
        this.satellite.classList.add("spot-me");
        this.satellite.style.opacity= "1";

        return setTimeout(function(){ 
            this.satellite.classList.remove("spot-me");
        }.bind(this), 3000);
    }

    stopSpotISS(timeoutId) {
        clearTimeout(timeoutId);
        this.satellite.classList.remove("spot-me");
    }

    hideIss() {
        this.satellite.style.display = "none";
    }

    showIss() {
        this.satellite.style.display = "inline-block";
    }

}