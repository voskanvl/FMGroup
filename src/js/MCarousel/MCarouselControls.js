export default function MCarouselControls(selectorPrev, selectorNext) {
    const leftButton = document.querySelector(selectorPrev);
    const rightButton = document.querySelector(selectorNext);
    if (leftButton)
        leftButton.addEventListener("click", () => {
            const instance = M.Carousel.getInstance(
                document.querySelector(".carousel"),
            );
            const { center } = instance;
            if (instance) {
                instance.prev();
            }
        });
    if (rightButton)
        rightButton.addEventListener("click", () => {
            const instance = M.Carousel.getInstance(
                document.querySelector(".carousel"),
            );
            const { center } = instance;
            if (instance) {
                instance.next();
            }
        });
}
