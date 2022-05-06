/*
    params
        points:HTMLElemnt[] - массив точек управления в текущем слайде слайдера
*/
const switchCarouselPoints = (
    points = [
        ...document.querySelectorAll(
            '.carousel-item.active .carousel-item__point',
        ),
    ],
) => {
    console.log('🚀 ~ switchCarouselPoints slides', points);
    points.forEach(slide =>
        slide.addEventListener('click', () => {
            const signElement = slide.querySelector('.carousel-item__sign');
            const data = slide.nextSibling;
            const switcher = {
                ['-']: () => {
                    data.style.opacity = 0;
                    signElement.textContent = '+';
                },
                ['+']: () => {
                    data.style.opacity = 1;
                    signElement.textContent = '-';
                },
            };
            switcher[signElement.textContent]();
        }),
    );
};

export default switchCarouselPoints;
