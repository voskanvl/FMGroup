import "../../sass/main.sass";
import debounce from "../debounce";
import { disappear, appear } from "../disappear";
import { ItcSimpleSlider } from "../simple-adaptive-slider.min";
import Meter from "../../components/meter/meter";
import { correctSvg, switchCarouselPoints } from "../switchCarouselPoints";
import mainMenu from "../../components/menu/main-menu";
import { initMCarousel, MCarouselControls } from "../MCarousel";
import touchBehaviour from "../touchBehaviour";
import changeControlsColor from "../changeControlsColor";

const container = document.querySelector(".container");
const meterContainer = document.querySelector(".meter__container");
const controlUp = document.querySelector(".control__up");
const controlDown = document.querySelector(".control__down");
const indicatorTitle = document.querySelector(".meter-indicator__title");
const productsHeaders = document.querySelectorAll(".products__header");

let isMCarouselInited = false;

const screen = document.querySelector(".screen");
if (screen) {
    const colorsForMeter = ["#000", "#000", "#fff", "#000", "#fff", "#000"];
    //--- init Meter
    const meter = new Meter(
        ".meter__line",
        id => {
            renderScreens(currentScreen, id);
            currentScreen = +id;
            changedScreenHandler({ detail: { currentScreen } });
        },
        colorsForMeter,
    );

    const screens = [...container.children];
    const exceededEvent = new Event("exceeded", { bubbles: true });
    const dropedEvent = new Event("droped", { bubbles: true });

    let currentScreen = 0;

    const renderScreens = (prev, next) => {
        //--- change controls color
        changeControlsColor(
            [controlUp, controlDown, indicatorTitle],
            colorsForMeter,
            next,
        );
        //--- init M.Carousel
        if (next == 1 && !isMCarouselInited) {
            setTimeout(() => {
                initMCarousel(".carousel", productsHeaders, 0);
                isMCarouselInited = true;
                //--- init points handler
                switchCarouselPoints();
            }, 400);
        }
        if (prev == next) return;
        disappear(screens[+prev]);
        appear(screens[+next]);
        meter.value = next;
        indicatorTitle.textContent = screens[next].dataset.name;
    };

    const map = {
        "-1": () => {
            const changedScreen = new CustomEvent("changedScreen", {
                detail: { currentScreen },
            });
            container.dispatchEvent(changedScreen);
            if (!currentScreen) return container.dispatchEvent(dropedEvent);
            renderScreens(currentScreen, currentScreen - 1);
            currentScreen--;
            changedScreenHandler({ detail: { currentScreen } });
        },
        "1": () => {
            const changedScreen = new CustomEvent("changedScreen", {
                detail: { currentScreen },
            });
            container.dispatchEvent(changedScreen);
            if (currentScreen === screens.length - 1)
                return container.dispatchEvent(exceededEvent);
            renderScreens(currentScreen, currentScreen + 1);
            currentScreen++;
            changedScreenHandler({ detail: { currentScreen } });
        },
        "0": () => {},
    };

    const handler = ({ deltaY }) => map[Math.sign(deltaY)]();

    const changedScreenHandler = ({ detail: { currentScreen: current } }) => {
        if (!current) {
            disappear(controlUp);
        } else {
            appear(controlUp);
        }
        if (currentScreen === screens.length - 1) {
            disappear(controlDown);
        } else {
            appear(controlDown);
        }
    };

    touchBehaviour(map);
    window.addEventListener("wheel", debounce(handler, 800));

    const init = () => {
        disappear(controlUp);
    };

    controlUp.addEventListener("click", map[-1]);
    controlDown.addEventListener("click", map[1]);
}
if (document.readyState !== "loading") {
    start();
} else {
    dclhandler = true;
    document.addEventListener("DOMContentLoaded", start);
}
function start() {
    console.log("DOMContentLoaded");
    //--- listen menu
    mainMenu();
    //--- ItcSimpleSlider
    const slidersClass = {
        slider: {
            name: ".slider",
            options: {
                loop: false,
                autoplay: false,
                interval: 5000,
                swipe: true,
            },
        },

        productionSlider: {
            name: ".production__slider",
            options: {
                loop: false,
                autoplay: false,
                interval: 5000,
                swipe: true,
                indicators: false,
            },
        },
    };
    for (let i in slidersClass) {
        if (document.querySelector(slidersClass[i].name))
            window[i] = new ItcSimpleSlider(
                slidersClass[i].name,
                slidersClass[i].options,
            );
    }
    //--- listen controls on Material carousel
    MCarouselControls(".products__control_prev", ".products__control_next");

    //--- усанавливаем текущий header в слайдере products
    if (productsHeaders?.length) appear(productsHeaders[0]);

    //---init Tabs
    if (document.querySelector(".tabs")) tabs = new Tabs();
    //---init controls switching scrrens
    init();
}
