/*
    interface IInterface{
        left: function,
        right: function,
        up: function,
        down: function,
    }
    map impliments IInterface
*/
export default function touchBehaviour(map) {
    const accordanceX = {
        ["1"]: "right",
        ["-1"]: "left",
    };
    const accordanceY = {
        ["1"]: "down",
        ["-1"]: "up",
    };
    let previousClientY = 0;
    let previousClientX = 0;
    const handlerTouch = ev => {
        ev.preventDefault();
        const {
            changedTouches: [{ clientX, clientY }],
        } = ev;
        const deltaY = previousClientY - clientY;
        const deltaX = previousClientX - clientX;
        const signY = -Math.sign(deltaY);
        const signX = -Math.sign(deltaX);
        console.log(signX, signY);
        previousClientY = clientY;
        previousClientX = clientX;

        // map[signY]();
        //signX -> переключаются слайды на MCarousel

        if (signX && map[accordanceX[signX]]) map[accordanceX[signX]]();
        if (signY && map[accordanceY[signY]]) map[accordanceY[signY]]();
    };
    window.addEventListener("touchstart", ev => {
        const {
            changedTouches: [{ clientY, clientX }],
            target,
        } = ev;
        previousClientY = clientY;
        previousClientX = clientX;

        //ищем ближайшего clickable родителя
        const targetEl = el =>
            "click" in el ? el : targetEl(el.parentElement);
        //эмулируем событие click
        targetEl(target).click();
    });
    window.addEventListener("touchend", handlerTouch, {
        passive: false,
    });
}
//TODO: при мобильном TOUCH при вертикальном перемещении делать перемещение на новую страницу, а при горизонтальном перемещение слайдера
