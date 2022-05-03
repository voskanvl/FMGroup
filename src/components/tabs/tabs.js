const tabsData = [
    "Оборудование для плазменной резки",
    "Оборудование для обработки стекла",
    "Оборудование для мебельного производства",
];
const tabs = document.querySelectorAll(".tab");
const init = () => {
    tabs[0].classList.add("active");
};
export default init;
