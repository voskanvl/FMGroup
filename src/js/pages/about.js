import "../../sass/pages/about.sass";
import mainMenu from "../../components/menu/main-menu";
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
    mainMenu();
}
