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
    //--- map
    const selectRegion = document.querySelector(".control.control__regions");
    const hint = document.querySelector(".hint");
    let currentRegion = null;
    const changeRegion = target => {
        if (currentRegion) currentRegion.style.fill = "transparent";
        target.style.fill = "#013485";
        currentRegion = target;
    };
    map.addEventListener("click", ({ target }) => {
        if (target.tagName === "path") {
            if (target === currentRegion) return;
            changeRegion(target);
        }
    });
    map.addEventListener("mousemove", ev => {
        if (ev.target.tagName === "path") {
            hint.style.left = +ev.clientX + 10 + "px";
            hint.style.top = +ev.clientY + 10 + "px";
            hint.textContent = ev.target.getAttribute("region");
            changeRegion(ev.target);
        }
    });
    selectRegion.addEventListener("change", () => {
        const regionEl = map.querySelector(
            `path[data-region="${+selectRegion.value}"]`,
        );
        console.log("🚀 ~ regionEl", +selectRegion.value, regionEl);
        changeRegion(regionEl);
    });
}
