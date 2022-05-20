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

    const FILL_COLOR = "#013485";
    let currentRegion = null;
    const changeRegion = target => {
        if (currentRegion) currentRegion.style.fill = "transparent";
        if (currentRegion?.children)
            [...currentRegion.children].forEach(
                e => (e.style.fill = "transparent"),
            );
        if (target?.children)
            [...target.children].forEach(e => (e.style.fill = FILL_COLOR));
        target.style.fill = FILL_COLOR;
        currentRegion = target;
    };

    map.addEventListener("click", ({ target }) => {
        if (target.tagName === "path") {
            if (target === currentRegion) return;
            changeRegion(target);
        }
    });
    const getRegion = el => {
        const region = el.getAttribute("region");
        if (region) return { region, el };
        if (el === document.body) return { region: null, el: null };
        return getRegion(el.parentElement);
    };
    map.addEventListener("mousemove", ({ target, clientX, clientY }) => {
        console.log("🚀 ~ target.tagName", target.tagName);
        if (target.tagName === "path" || target.tagName === "g") {
            hint.style.left = +clientX + 10 + "px";
            hint.style.top = +clientY + 10 + "px";
            const { region, el } = getRegion(target);
            hint.textContent = region;
            changeRegion(el);
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
