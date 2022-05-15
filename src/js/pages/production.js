import "../../sass/pages/production.sass";
import mainMenu from "../../components/menu/main-menu";
import { ItcSimpleSlider } from "../simple-adaptive-slider.min.js";
import Tabs from "../../components/tabs/tabs";
import { disappear, appear } from "../disappear";

if (document.readyState !== "loading") {
    window.addEventListener("DOMContentLoaded", start());
} else {
    start();
}
if (document.readyState !== "complete") {
    //выключаем прелоадер
    const preloader = document.querySelector(".preload");
    preloader.classList.add("hidden");
}

function start() {
    const categories = document.querySelectorAll(".category");
    console.log("This is PRODUCTION");
    mainMenu();
    const tabs = new Tabs();
    //скрываем все категории и показываем начальную
    // categories.forEach(el => disappear(el));
    // setTimeout(() => appear(categories[0]), 400);
    // ---
    //отказался из-за проблем с Time to interactive
    //устанвливаем начальные параметры в pug
    tabs.addEventListener(tab => {
        disappear(categories[tabs.prevTab]);
        appear(categories[tab]);
    });

    window["sliderProducts"] = new ItcSimpleSlider(
        ".slider-production__slider_0",
        {
            loop: false,
            autoplay: false,
            interval: 5000,
            indicators: false,
            swipe: true,
        },
    );
    window["sliderProducts"] = new ItcSimpleSlider(
        ".slider-production__slider_1",
        {
            loop: false,
            autoplay: false,
            interval: 5000,
            indicators: false,
            swipe: true,
        },
    );
    window["sliderProducts"] = new ItcSimpleSlider(
        ".slider-production__slider_2",
        {
            loop: false,
            autoplay: false,
            interval: 5000,
            indicators: false,
            swipe: true,
        },
    );
    //--- MODAL
    const modal = document.querySelector(".modal");
    const button = document.querySelectorAll(".production button.button");
    const close = modal.querySelector(".modal__close");
    close.addEventListener("click", () => {
        disappear(modal);
    });
    button.forEach(el =>
        el.addEventListener("click", () => {
            console.log("modal click");
            appear(modal, "block");
            // modal.style.display = "block";
            // setTimeout(() => {
            //     modal.style.opacity = 1;
            // }, 400);
        }),
    );
}
