import { disappear, appear } from "../disappear";
export function debounce(f, ms) {
    let isCooldown = false;
    return function () {
        if (isCooldown) return;
        isCooldown = true;
        f.apply(this, arguments);
        setTimeout(() => (isCooldown = false), ms);
    };
}
const changedScreenHandler = ({ detail: { currentScreen: current } }) => {
    if (!current) {
        disappear(controlUp);
    } else {
        appear(controlUp);
    }
    if (currentScreen === screens.length - 1) {
        disappear(controlDown);
    } else {
        appear(controlDown);
    }
};
const map = {
    "-1": () => {
        const changedScreen = new CustomEvent("changedScreen", {
            detail: { currentScreen },
        });
        container.dispatchEvent(changedScreen);
        if (!currentScreen) return container.dispatchEvent(dropedEvent);
        renderScreens(currentScreen, currentScreen - 1);
        currentScreen--;
        changedScreenHandler({ detail: { currentScreen } });
    },
    "1": () => {
        const changedScreen = new CustomEvent("changedScreen", {
            detail: { currentScreen },
        });
        container.dispatchEvent(changedScreen);
        if (currentScreen === screens.length - 1)
            return container.dispatchEvent(exceededEvent);
        renderScreens(currentScreen, currentScreen + 1);
        currentScreen++;
        changedScreenHandler({ detail: { currentScreen } });
    },
    "0": () => {},
};
const handler = ({ deltaY }) => map[Math.sign(deltaY)]();
window.addEventListener("wheel", debounce(handler, 800));
window.addEventListener("touchstart", ev => {
    const {
        changedTouches: [{ clientY }],
        target,
    } = ev;
    previousClientY = clientY;
    if ("click" in target) target.click();
});
window.addEventListener("touchend", handlerTouch, {
    passive: false,
});
