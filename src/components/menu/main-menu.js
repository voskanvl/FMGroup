import { disappear, appear } from "../../js/disappear";
const mainMenu = (element = ".main-menu") => {
    // const menu = document.querySelector(element);
    const switchers = document.querySelectorAll(element + "__switcher");
    // const label = document.querySelector(element + "__label");
    // const phone = document.querySelector("h1.header__phone");

    const handler = ({ target }) => {
        const menu = target.closest(element);
        console.log("🚀 ~ menu", menu);
        const label = target.closest(element + "__label");
        console.log("🚀 ~ label", label);
        const phone = target.closest("h1.header__phone");
        console.log("🚀 ~ phone", phone);

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
    switchers.forEach(switcher => switcher.addEventListener("click", handler));
};
export default mainMenu;
