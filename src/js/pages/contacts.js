import "../../sass/pages/contacts.sass";
import mainMenu from "../../components/menu/main-menu";

if (document.readyState !== "complete") {
    //выключаем прелоадер
    const preloader = document.querySelector(".preload");
    preloader.classList.add("hidden");
}
console.log("There is CONTACTS");
mainMenu();
