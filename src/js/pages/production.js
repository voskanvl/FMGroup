import "../../sass/pages/production.sass";
import mainMenu from "../../components/menu/main-menu";
import { ItcSimpleSlider } from "../simple-adaptive-slider.min.js";
import Tabs from "../../components/tabs/tabs";

if (document.readyState !== "loading") {
    window.addEventListener("DOMContentLoaded", start());
} else {
    start();
}

function start() {
    console.log("This is PRODUCTION");
    mainMenu();
    const tabs = new Tabs();

    window["sliderProducts"] = new ItcSimpleSlider(".slider", {
        loop: false,
        autoplay: false,
        interval: 5000,
        indicators: false,
        swipe: true,
    });
}
