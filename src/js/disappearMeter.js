import debounce from "./debounce";
const disappearMeter = on => () => {
    const meterIndicator = document.querySelector(".meter-indicator ");
    const controls = document.querySelectorAll(".control");
    console.log("🚀 ~ controls", controls);
    const screen = document.querySelector("#about");
    let isShow = false;
    let timeout = null;
    const listener = debounce(() => {
        meterIndicator.style.opacity = 1;
        controls.forEach(el => (el.style.opacity = 1));
        isShow = true;
        timeout = setTimeout(() => {
            if (isShow && screen.style.opacity == 1) {
                console.log(
                    "isShow && screen.style.opacity",
                    isShow && screen.style.opacity,
                );
                meterIndicator.style.opacity = 0;
                controls.forEach(el => (el.style.opacity = 0));
            }
            isShow = false;
        }, 3000);
    }, 1000);
    if (on === "on") {
        setTimeout(() => {
            meterIndicator.style.opacity = 0;
            controls.forEach(el => (el.style.opacity = 0));
        }, 1000);
        screen.addEventListener("mousemove", listener);
        screen.addEventListener("click", listener);
        return;
    }
    if (on === "off") {
        screen.removeEventListener("mousemove", listener);
        screen.removeEventListener("click", listener);
        clearTimeout(timeout);
        meterIndicator.style.opacity = 1;
        controls.forEach(el => (el.style.opacity = 1));
        return;
    }
};

export default { on: disappearMeter("on"), off: disappearMeter("off") };
