export default function touchBehaviour(map) {
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
        map[signY]();
        //signX -> переключаются слайды на MCarousel
    };
    window.addEventListener("touchstart", ev => {
        console.log("ev.changedTouches", ev.changedTouches[0]);
        const {
            changedTouches: [{ clientY, clientX }],
            target,
        } = ev;
        previousClientY = clientY;
        previousClientX = clientX;

        const targetEl = el =>
            "click" in el ? el : targetEl(el.parentElement);

        targetEl(target).click();
    });
    window.addEventListener("touchend", handlerTouch, {
        passive: false,
    });
}
//TODO: при мобильном TOUCH при вертикальном перемещении делать перемещение на новую страницу, а при горизонтальном перемещение слайдера
