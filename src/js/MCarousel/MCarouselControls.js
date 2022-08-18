export default function MCarouselControls(selectorPrev, selectorNext) {
    const leftButton = document.querySelector(selectorPrev);
    const rightButton = document.querySelector(selectorNext);
    if (leftButton)
        leftButton.addEventListener("click", () => {
            const instance = M.Carousel.getInstance(
                document.querySelector(".carousel"),
            );
            if (instance) {
                instance.prev();
            }
        });
    if (rightButton)
        rightButton.addEventListener("click", () => {
            const instance = M.Carousel.getInstance(
                document.querySelector(".carousel"),
            );
            if (instance) {
                instance.next();
            }
        });
}
