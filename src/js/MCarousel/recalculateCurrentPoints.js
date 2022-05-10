const recalculatedElements = [];
export default function recalculateCurrentPoints(id, carouselEl, etalon) {
    if (!recalculatedElements.includes(id)) {
        const item = carouselEl.querySelector(`a[data-id="${id}"]`);
        const wrapper = item.querySelector(".carousel-item__wrapper");
        const widthWrapper = wrapper.offsetWidth;
        const currentCoefficient = widthWrapper / etalon;
        const points = item.querySelectorAll(".carousel-item__point");
        points.forEach(el => {
            el.style.left = parseInt(el.style.left) * currentCoefficient + "px";
            el.style.top = parseInt(el.style.top) * currentCoefficient + "px";
        });
        recalculatedElements.push(id);
    }
}
