import "../../sass/pages/projects.sass";
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
    const map = document.querySelector("#map");
    mainMenu();
    let currentRegion = null;
    map.addEventListener("click", ev => {
        if (ev.target.tagName === "path") {
            if (ev.target === currentRegion) return;
            if (currentRegion) currentRegion.style.fill = "transparent";
            ev.target.style.fill = "#013485";
            currentRegion = ev.target;
        }
    });
}
