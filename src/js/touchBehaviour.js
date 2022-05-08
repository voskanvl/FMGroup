export default function touchBehaviour(map) {
    let previousClientY = 0;
    const handlerTouch = ev => {
        ev.preventDefault();
        const {
            changedTouches: [{ clientY }],
        } = ev;
        const deltaY = previousClientY - clientY;
        const signY = -Math.sign(deltaY);
        console.log(signY);
        previousClientY = clientY;
        map[signY]();
    };
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
}
