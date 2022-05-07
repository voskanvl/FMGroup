import "../../sass/pages/articles.sass";
import mainMenu from "../../components/menu/main-menu";
if (document.readyState !== "loading") {
    window.addEventListener("DOMContentLoaded", start());
} else {
    start();
}
function start() {
    mainMenu();
}
