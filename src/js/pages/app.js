import "../../sass/main.sass";
import debounce from "../debounce";
import { disappear, appear } from "../disappear";
import { ItcSimpleSlider } from "../simple-adaptive-slider.min";
import Meter from "../../components/meter/meter";
import { switchCarouselPoints } from "../MCarousel/switchCarouselPoints";
import mainMenu from "../../components/menu/main-menu";
import { initMCarousel, MCarouselControls } from "../MCarousel";
import touchBehaviour from "../touchBehaviour";
import changeControlsColor from "../changeControlsColor";
import YTPlayer from "./YT";
import disappearMeter from "../disappearMeter";
import validate from "../validate";
import { Validate1 } from "../validate1";
import { submitHandler } from "../submitHandler";

const container = document.querySelector(".container");
const controlUp = document.querySelector(".control__up");
const controlDown = document.querySelector(".control__down");
const indicatorTitle = document.querySelector(".meter-indicator__title");
const productsHeaders = document.querySelectorAll(".products__header");
const aboutPanel = document.querySelector(".about__panel");

let isMCarouselInited = false;

//---init video on about screen
const ytplayer = new YTPlayer();
window.ytplayer = ytplayer;
window.onYouTubeIframeAPIReady = ytplayer.init;

const screen = document.querySelector(".screen");
if (screen) {
    const colorsForMeter = ["#000", "#000", "#fff", "#fff", "#fff", "#000"];
    let currentScreen = 0;
    const screens = [...container.children];
    const exceededEvent = new Event("exceeded", { bubbles: true });
    const dropedEvent = new Event("droped", { bubbles: true });
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

    const renderScreens = (prev, next) => {
        if (prev == next) return;
        //--- change controls color
        changeControlsColor(
            [controlUp, controlDown, indicatorTitle],
            colorsForMeter,
            next,
        );

        //--- play video on screen 3
        const panelClickHandler = () => {
            if (ytplayer.player.getPlayerState() === 1) ytplayer.pause();
            if (ytplayer.player.getPlayerState() === 2) ytplayer.start();
        };
        if (prev === 3) {
            ytplayer.pause();
            disappearMeter.off();
            aboutPanel.removeEventListener("click", panelClickHandler);
        }
        if (next === 3) {
            aboutPanel.addEventListener("click", panelClickHandler);
            ytplayer.start();
            disappearMeter.on();
        }

        disappear(screens[+prev]);
        appear(screens[+next]);
        meter.value = next;
        indicatorTitle.addEventListener("transitionend", catchTransition);
        function catchTransition() {
            indicatorTitle.textContent = screens[next].dataset.name;
            indicatorTitle.style.opacity = 1;
            indicatorTitle.removeEventListener("transtionend", catchTransition);
        }
        indicatorTitle.style.opacity = 0;
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

    touchBehaviour({
        up() {
            map[-1]();
        },
        down() {
            map[1]();
        },
    });
    window.addEventListener("wheel", debounce(handler, 800));

    controlUp.addEventListener("click", map[-1]);
    controlDown.addEventListener("click", map[1]);
}
if (document.readyState !== "loading") {
    start();
} else {
    document.addEventListener("DOMContentLoaded", start);
}
if (document.readyState !== "complete") {
    //выключаем прелоадер

    const preloader = document.querySelector(".preload");
    preloader.classList.add("hidden");
}
function start() {
    //--- listen menu
    mainMenu();
    new ItcSimpleSlider(".slider", {
        loop: false,
        autoplay: false,
        interval: 5000,
        swipe: true,
    });
    //--- fix indicators click on slider in Tiser
    const buttonsIdicators = document.querySelectorAll(".number");
    buttonsIdicators.forEach(e =>
        e.addEventListener("click", () => e.parentElement.click()),
    );
    //--- Material carousel in products screen ---
    setTimeout(() => {
        initMCarousel(".carousel", productsHeaders, 0);
        isMCarouselInited = true;
        //--- init points handler
        switchCarouselPoints();
        const { rightButton, leftButton } = MCarouselControls(
            ".products__control_prev",
            ".products__control_next",
        );
        //--- костыль для инициализации отображения карусели
        //--- иначе, при начальной загрузке все картинки смещены вверх
        //--- почему, не знаю
        setTimeout(() => leftButton.click(), 800);
    }, 0);

    //--- усанавливаем текущий header в слайдере products
    if (productsHeaders?.length) appear(productsHeaders[0]);

    //---init controls switching screens
    disappear(controlUp);
    const applicationForm = document.querySelector(".application__form");

    Validate1(applicationForm);

    submitHandler(applicationForm);
    //--- priority__container stopPropagation---

    const isScrollable = element => {
        return element.scrollHeight !== element.offsetHeight;
    };

    const priorityContainer = document.querySelector(".priority__container");

    priorityContainer.addEventListener("touchstart", e => {
        if (isScrollable(priorityContainer)) e.stopPropagation();
    });
    priorityContainer.addEventListener("touchend", e => {
        if (isScrollable(priorityContainer)) e.stopPropagation();
    });
}
