import "../../sass/pages/blank.sass";
import mainMenu from "../../components/menu/main-menu";
mainMenu();
if (document.readyState !== "complete") {
    //выключаем прелоадер
    const preloader = document.querySelector(".preload");
    preloader.classList.add("hidden");
}
