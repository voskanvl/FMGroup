const mainMenu = (element = ".main-menu") => {
    const menu = document.querySelector(element);
    menu.addEventListener("click", () => menu.classList.toggle("active"));
};
export default mainMenu;
