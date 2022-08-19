export default function MCarouselControls(selectorPrev, selectorNext) {
    const leftButton = document.querySelector(selectorPrev);
    const rightButton = document.querySelector(selectorNext);
    const instance = M.Carousel.getInstance(
        document.querySelector(".carousel"),
    );
    if (!instance) throw Error("Slider didn't initiated");
    if (leftButton)
        leftButton.addEventListener("click", () => {
            instance.prev();
        });
    if (rightButton)
        rightButton.addEventListener("click", () => {
            instance.next();
        });
    return { leftButton, rightButton, instance };
}
