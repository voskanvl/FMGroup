import { disappear, appear } from "../disappear";
import recalculateCurrentPoints from "./recalculateCurrentPoints";
export default function initMCarousel(selector, productsHeaders, currentSlide) {
    const slider = document.querySelector(selector);
    // recalculateCurrentPoints(0, slider, 800);
    M.Carousel.init(slider, {
        indicators: false,
        numVisible: 3,
        padding: 1200,
    });
}
