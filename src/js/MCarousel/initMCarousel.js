import { disappear, appear } from "../disappear";
export default function initMCarousel(selector, productsHeaders, currentSlide) {
    const slider = document.querySelector(selector);
    M.Carousel.init(slider, {
        indicators: false,
        numVisible: 3,
        padding: 1200,
        onCycleTo({ dataset: { id } }) {
            if (id != currentSlide) {
                disappear(productsHeaders[currentSlide]);
                appear(productsHeaders[+id]);
                currentSlide = +id;
            }
        },
    });
}
