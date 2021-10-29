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

    initOrientationMarker() {
        const container = document.querySelector(".container");
        const containerAttribute = (a) => {
            container.setAttribute("orientation", a);
        }

        (document.documentElement.clientHeight > document.documentElement.clientWidth) ? containerAttribute("portrait") : containerAttribute("landscape")
        
        window.addEventListener("orientationchange", () => {
            (container.getAttribute("orientation") === "portrait") ? containerAttribute("landscape") : containerAttribute("portrait");        
        });
    }
}
