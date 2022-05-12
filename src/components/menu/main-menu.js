import { disappear, appear } from "../../js/disappear";
const mainMenu = (element = ".main-menu") => {
    const menu = document.querySelector(element);
    const switcher = menu.querySelector(".main-menu__switcher");
    const label = document.querySelector(element + "__label");
    const wrapper = document.querySelector(element + "__wrapper");
    const ul = document.querySelector(element + "__wrapper > ul");
    const phone = document.querySelector("h1.header__phone");

    const handler = ({ target }) => {
        menu.classList.toggle("active");
        const match = matchMedia("(max-width: 1024px)").matches;

        if (match && menu.classList.contains("active")) {
            phone.style.flex = "1 1 10%";
        } else {
            phone.style.flex = "";
        }
        //switch label
        if (label && menu.classList.contains("active")) {
            disappear(label);
        } else {
            appear(label);
        }
    };
    switcher.addEventListener("click", handler);
};
export default mainMenu;
