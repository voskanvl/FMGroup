import { disappear, appear } from './disappear';
import { ItcSimpleSlider } from './simple-adaptive-slider.min';
const container = document.querySelector('.container');
const controlUp = document.querySelector('.control__up');
const controlDown = document.querySelector('.control__down');

const screens = [...container.children];
function debounce(f, ms) {
    let isCooldown = false;
    return function () {
        if (isCooldown) return;
        isCooldown = true;
        f.apply(this, arguments);
        setTimeout(() => (isCooldown = false), ms);
    };
}

const exceededEvent = new Event('exceeded', { bubbles: true });
const dropedEvent = new Event('droped', { bubbles: true });

let currentScreen = 0;

const renderScreens = (prev, next) => {
    screens[prev].style.opacity = 0;
    screens[next].style.opacity = 1;
};

const map = {
    '-1': () => {
        const changedScreen = new CustomEvent('changedScreen', {
            detail: { currentScreen },
        });
        container.dispatchEvent(changedScreen);
        if (!currentScreen) return container.dispatchEvent(dropedEvent);
        renderScreens(currentScreen, currentScreen - 1);
        currentScreen--;
        changedScreenHandler({ detail: { currentScreen } });
    },
    '1': () => {
        const changedScreen = new CustomEvent('changedScreen', {
            detail: { currentScreen },
        });
        container.dispatchEvent(changedScreen);
        if (currentScreen === screens.length - 1)
            return container.dispatchEvent(exceededEvent);
        renderScreens(currentScreen, currentScreen + 1);
        currentScreen++;
        changedScreenHandler({ detail: { currentScreen } });
    },
    '0': () => {},
};

const handler = ({ deltaY }) => map[Math.sign(deltaY)]();

//--- появление/исчезновение контрола

//---
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

window.addEventListener('wheel', debounce(handler, 800));

// container.addEventListener("changedScreen", changedScreenHandler);
const init = () => {
    disappear(controlUp);
};

controlUp.addEventListener('click', map[-1]);
controlDown.addEventListener('click', map[1]);

new ItcSimpleSlider('.slider', {
    loop: false,
    autoplay: false,
    interval: 5000,
    swipe: true,
});
