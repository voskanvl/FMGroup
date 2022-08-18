const recalculatedElements = [];
export default function recalculateCurrentPoints(id, carouselEl, etalon) {
    if (!recalculatedElements.includes(+id)) {
        const item = carouselEl.querySelector(`a[data-id="${id}"]`);
        const wrapper = item.querySelector(".carousel-item__wrapper");
        let time = getComputedStyle(wrapper).transitionDuration;
        time =
            parseFloat(time) >= 1 ? parseFloat(time) : parseFloat(time) * 1000;
        setTimeout(() => {
            const item = carouselEl.querySelector(".carousel-item.active");
            const wrapper = item.querySelector(".carousel-item__wrapper");
            const widthWrapper = wrapper.offsetWidth;
            const currentCoefficient = widthWrapper / etalon; // коээфициент масштаба

            const points = item.querySelectorAll(".carousel-item__point");
            points.forEach(el => {
                el.style.left =
                    parseInt(el.style.left) * currentCoefficient + "px";
                el.style.top =
                    parseInt(el.style.top) * currentCoefficient + "px";
            });
            recalculatedElements.push(+id);
        }, 500 + 50); // задержка по времени анимации .carousel-item__wrapper + 5ms, задержка указана в стилях
    }
}
