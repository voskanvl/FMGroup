document.addEventListener('DOMContentLoaded', function () {
    // инициализация слайдера
    var slider = new SimpleAdaptiveSlider('.slider-main', {
        loop: false,
        autoplay: false,
        interval: 5000,
        swipe: true,
    });
});
