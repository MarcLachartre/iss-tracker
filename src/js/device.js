import MobileDetect from "mobile-detect"

export default class Device {
    constructor(design) {
        this.design = design
    }

    isMobileDevice() {
        const md = new MobileDetect(window.navigator.userAgent);
        return (md.tablet() !== null || md.mobile() !== null) ? true : false
    }

    isPortrait() {
        return (window.screen.width < window.screen.height ) ? true : false
    }

    initOrientationMarker() {
        (document.documentElement.clientHeight > document.documentElement.clientWidth) ? document.querySelector(".container").setAttribute("orientation", "portrait") : document.querySelector(".container").setAttribute("orientation", "landscape")
    }
}
