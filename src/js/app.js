import { disappear, appear } from "./disappear";
import { ItcSimpleSlider } from "./simple-adaptive-slider.min";
import Meter from "../components/meter/meter";
import Tabs from "../components/tabs/tabs";
import { correctSvg, switchCarouselPoints } from "./switchCarouselPoints";

const container = document.querySelector(".container");
const meterContainer = document.querySelector(".meter__container");
const controlUp = document.querySelector(".control__up");
const controlDown = document.querySelector(".control__down");
const indicatorTitle = document.querySelector(".meter-indicator__title");
const productsHeaders = document.querySelectorAll(".products__header");

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
    let currentSlide = 0;

    const renderScreens = (prev, next) => {
        //--- init M.Carousel
        if (next == 1 && !isMCarouselInited) {
            setTimeout(() => {
                M.Carousel.init(document.querySelector(".carousel"), {
                    indicators: true,
                    numVisible: 3,
                    padding: 400,
                    onCycleTo({ dataset: { id } }) {
                        if (id != currentSlide) {
                            disappear(productsHeaders[currentSlide]);
                            appear(productsHeaders[+id]);
                            currentSlide = +id;
                        }
                        console.log(
                            "onCycleTo id currentSlide",
                            id,
                            currentSlide,
                        );
                    },
                });
                isMCarouselInited = true;
                // productsHeaders[currentSlide].style.opacity = 1;
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
    //--- listen menu
    const menu = document.querySelector(".main-menu");
    menu.addEventListener("click", () => menu.classList.toggle("active"));
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
    //--- listen controls on Material carousel
    const leftButton = document.querySelector(".products__control_prev");
    const rightButton = document.querySelector(".products__control_next");

    //--- усанавливаем текущий header в слайдере products
    appear(productsHeaders[0]);

    leftButton.addEventListener("click", () => {
        const instance = M.Carousel.getInstance(
            document.querySelector(".carousel"),
        );
        const { center } = instance;
        if (instance) {
            instance.prev();
        }
    });
    rightButton.addEventListener("click", () => {
        const instance = M.Carousel.getInstance(
            document.querySelector(".carousel"),
        );
        const { center } = instance;
        if (instance) {
            instance.next();
        }
    });
});

Tabs();
