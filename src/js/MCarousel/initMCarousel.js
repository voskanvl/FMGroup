import { disappear, appear } from "../disappear";
export default function initMCarousel(selector, productsHeaders, currentSlide) {
    M.Carousel.init(document.querySelector(selector), {
        indicators: true,
        numVisible: 3,
        padding: 400,
        onCycleTo({ dataset: { id } }) {
            if (id != currentSlide) {
                disappear(productsHeaders[currentSlide]);
                appear(productsHeaders[+id]);
                currentSlide = +id;
            }
            console.log("onCycleTo id currentSlide", id, currentSlide);
        },
    });
}
