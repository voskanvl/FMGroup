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
// import validate from "../validate";
import { Validate1 } from "../validate1";
import { submitHandler } from "../submitHandler";
import { Counter } from "./counter";

const container = document.querySelector(".container");
const controlUp = document.querySelector(".control__up");
const controlDown = document.querySelector(".control__down");
const indicatorTitle = document.querySelector(".meter-indicator__title");
const productsHeaders = document.querySelectorAll(".products__header");
const aboutPanel = document.querySelector(".about__panel");

//---init video on about screen
const ytplayer = new YTPlayer();
window.ytplayer = ytplayer;
window.onYouTubeIframeAPIReady = ytplayer.init;

const screen = document.querySelector(".screen");
if (screen) {
    const counter = new Counter();

    const colorsForMeter = ["#000", "#000", "#fff", "#fff", "#fff", "#000"];
    // let currentScreen = 0;
    const screens = [...container.children];
    const exceededEvent = new Event("exceeded", { bubbles: true });
    const dropedEvent = new Event("droped", { bubbles: true });
    //--- init Meter
    const meter = new Meter(
        ".meter__line",
        id => {
            counter.value = id;
            changedScreenHandler();
        },
        colorsForMeter,
    );

    //--- switch screens
    counter.subscribe(({ prev, current }) => {
        disappear(screens[+prev]);
        appear(screens[+current]);
        meter.value = current;
    });

    //--- change controls color
    counter.subscribe(({ current }) =>
        changeControlsColor([controlUp, controlDown, indicatorTitle], colorsForMeter, current),
    );
    //--- control playback video on 3th screen
    counter.subscribe(({ prev, current }) => {
        const panelClickHandler = () => {
            if (ytplayer.player.getPlayerState() === 1) ytplayer.pause();
            if (ytplayer.player.getPlayerState() === 2) ytplayer.start();
        };
        if (prev === 3) {
            ytplayer.pause();
            disappearMeter.off();
            aboutPanel.removeEventListener("click", panelClickHandler);
        }
        if (current === 3) {
            aboutPanel.addEventListener("click", panelClickHandler);
            ytplayer.start();
            disappearMeter.on();
        }
    });

    counter.subscribe(({ current }) => {
        indicatorTitle.addEventListener("transitionend", catchTransition);
        function catchTransition() {
            indicatorTitle.textContent = screens[current].dataset.name;
            indicatorTitle.style.opacity = 1;
            indicatorTitle.removeEventListener("transtionend", catchTransition);
        }
        indicatorTitle.style.opacity = 0;
    });

    const map = {
        "-1": () => {
            if (!counter.value) return container.dispatchEvent(dropedEvent);
            counter.dec();
            changedScreenHandler();
        },
        "1": () => {
            if (counter.value === screens.length - 1) return container.dispatchEvent(exceededEvent);
            counter.inc();
            changedScreenHandler();
        },
        "0": () => {},
    };

    const handler = ({ deltaY }) => map[Math.sign(deltaY)]();

    const changedScreenHandler = () => {
        if (!counter.value) {
            disappear(controlUp);
        } else {
            appear(controlUp);
        }
        if (counter.value === screens.length - 1) {
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

    //--- кнопка "ЗАКАЗАТЬ"
    document.querySelector(".tiser__button").addEventListener("click", () => {
        counter.value = 4;
        appear(controlUp);
    });
}
// document.addEventListener("readystatechange", e =>
//     console.log("readystatechange", document.readyState),
// );
// if (document.readyState == "loading") {
//     document.addEventListener("DOMContentLoaded", start);
// } else {
//     start();
// }

// if (document.readyState !== "complete") {
//     //выключаем прелоадер

//     const preloader = document.querySelector(".preload");
//     preloader.classList.add("hidden");
// }
start();

function start() {
    console.log("start");
    setTimeout(() => {
        const preloader = document.querySelector(".preload");
        preloader.classList.add("hidden");
    }, 200);

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
    buttonsIdicators.forEach(e => e.addEventListener("click", () => e.parentElement.click()));
    //--- Material carousel in products screen ---
  
    window.carouselInstance = initMCarousel(".carousel", productsHeaders, 0);
    //--- init points handler
    switchCarouselPoints();
    const { rightButton, leftButton } = MCarouselControls(
        ".products__control_prev",
        ".products__control_next",
    );
    //--- костыль для инициализации отображения карусели
    //--- иначе, при начальной загрузке все картинки смещены вверх
    //--- почему, не знаю

    const c1 = document.querySelector(".carousel")
    window.carouselInstance.disabledScroll = false
    const interval = setInterval(()=>{window.carouselInstance.disabledScroll || window.carouselInstance.next()},200)
    
    const counter = new Counter();
    counter.subscribe(({ current }) => {
        console.log("current",current, counter.value);
        if (current === 1 && window.carouselInstance) {
            console.log("counter===1 && window.carouselInstance");
            clearInterval(interval)
        }
    });

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
