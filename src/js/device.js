import MobileDetect from "mobile-detect"

export default class Device {
    constructor(design) {
        this.design = design;
    }

    isMobileDevice() {
        const md = new MobileDetect(window.navigator.userAgent);
        return (md.tablet() !== null || md.mobile() !== null) ? true : false
    }

    isPortrait() {
        return (window.screen.width < window.screen.height) ? true : false
    }

    initOrientationMarker() { //Necessary on load on mobile devices in order to know the orientation of the device and adapt display. On mobile rotation, it give a orientation attribute to the container that is either landscape or portrait
        const container = document.querySelector(".container");
        const containerAttribute = (attr) => {
            container.setAttribute("orientation", attr);
        }

        (document.documentElement.clientHeight > document.documentElement.clientWidth) ? containerAttribute("portrait") : containerAttribute("landscape")
        
        window.addEventListener("orientationchange", () => {
            (container.getAttribute("orientation") === "portrait") ? containerAttribute("landscape") : containerAttribute("portrait");        
        });
    }
}
