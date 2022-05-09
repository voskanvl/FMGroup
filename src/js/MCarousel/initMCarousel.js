import { disappear, appear } from "../disappear";
import recalculateCurrentPoints from "./recalculateCurrentPoints";
export default function initMCarousel(selector, productsHeaders, currentSlide) {
    const slider = document.querySelector(selector);
    recalculateCurrentPoints(0, slider, 400);
    M.Carousel.init(slider, {
        indicators: true,
        numVisible: 3,
        padding: 400,
        onCycleTo({ dataset: { id } }) {
            if (id != currentSlide) {
                disappear(productsHeaders[currentSlide]);
                appear(productsHeaders[+id]);
                currentSlide = +id;
                recalculateCurrentPoints(id, slider, 400);
            }
            console.log("onCycleTo id currentSlide", id, currentSlide);
        },
    });
}
