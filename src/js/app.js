import { disappear, appear } from "./disappear";
import { ItcSimpleSlider } from "./simple-adaptive-slider.min";
import Meter from "../components/meter/meter";
import Tabs from "../components/tabs/tabs";

const container = document.querySelector(".container");
const meterContainer = document.querySelector(".meter__container");
const controlUp = document.querySelector(".control__up");
const controlDown = document.querySelector(".control__down");
const indicatorTitle = document.querySelector(".meter-indicator__title");

const production = document.querySelector(".production");
let isMCarouselInited = false;

const screen = document.querySelector(".screen");
if (screen) {
    const colorsForMeter = [
        "#000",
        "#000",
        "#fff",
        "#fff",
        "#fff",
        "#000",
        "#000",
    ];
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
    function debounce(f, ms) {
        let isCooldown = false;
        return function () {
            if (isCooldown) return;
            isCooldown = true;
            f.apply(this, arguments);
            setTimeout(() => (isCooldown = false), ms);
        };
    }

    const exceededEvent = new Event("exceeded", { bubbles: true });
    const dropedEvent = new Event("droped", { bubbles: true });

    let currentScreen = 0;

    const renderScreens = (prev, next) => {
        console.log("🚀 ~ prev, next", prev, next);
        //--- init M.Carousel
        if (next == 1 && !isMCarouselInited) {
            setTimeout(() => {
                M.Carousel.init(document.querySelector(".carousel"), {
                    indicators: true,
                    numVisible: 3,
                    padding: 400,
                });
                console.log("M.Carousel.init");
                isMCarouselInited = true;
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

    window.addEventListener("wheel", debounce(handler, 800));
    window.addEventListener("touchmove", debounce(handler, 800));

    // container.addEventListener("changedScreen", changedScreenHandler);
    const init = () => {
        disappear(controlUp);
    };

    controlUp.addEventListener("click", map[-1]);
    controlDown.addEventListener("click", map[1]);

    init();
}
//--slider--
window.addEventListener("DOMContentLoaded", () => {
    //--- material slider
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
        sliderProducts: {
            name: ".slider-products",
            options: {
                loop: false,
                autoplay: false,
                interval: 5000,
                indicators: false,
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
});
console.log("🚀 ~ DOMContentLoaded", DOMContentLoaded);
console.log("🚀 ~ DOMContentLoaded", DOMContentLoaded);

window.addEventListener("load", () => {});

Tabs();
