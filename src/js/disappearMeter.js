import debounce from "./debounce";
const disappearMeter = on => () => {
    const meterIndicator = document.querySelector(".meter-indicator ");
    const controls = document.querySelectorAll(".control");
    console.log("🚀 ~ controls", controls);
    const screen = document.querySelector("#about");
    let isShow = false;
    const listener = debounce(() => {
        meterIndicator.style.opacity = 1;
        controls.forEach(el => (el.style.opacity = 1));
        isShow = true;
        setTimeout(() => {
            if (isShow) {
                meterIndicator.style.opacity = 0;
                controls.forEach(el => (el.style.opacity = 0));
            }
            isShow = false;
        }, 3000);
    }, 1000);
    if (on === "on") {
        meterIndicator.style.opacity = 0;
        controls.forEach(el => (el.style.opacity = 0));
        screen.addEventListener("mousemove", listener);
        return;
    }
    if (on === "off") {
        screen.removeEventListener("mousemove", listener);
        return;
    }
};

export default { on: disappearMeter("on"), off: disappearMeter("off") };
