const container = document.querySelector('.container');
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
        if (!currentScreen) return container.dispatchEvent(dropedEvent);
        renderScreens(currentScreen, currentScreen - 1);
        currentScreen--;
    },
    '1': () => {
        if (currentScreen === screens.length - 1)
            return container.dispatchEvent(exceededEvent);
        renderScreens(currentScreen, currentScreen + 1);
        currentScreen++;
    },
    '0': () => {},
};

const handler = ({ deltaY }) => map[Math.sign(deltaY)]();

window.addEventListener('wheel', debounce(handler, 800));
