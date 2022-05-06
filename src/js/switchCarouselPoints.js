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

    const correctSvg = (dataElement, svgElement, pointElement) => {
        // const heightData = dataElement.offsetHeight;
        // const line = {};
        // line.element = svgElement.querySelector('line');
        // //получаем координаты конца линии
        // line.x2 = line.element.getAttribute('x2');
        // line.y2 = line.element.getAttribute('y2');
        // // получаем данные из элмента svg
        // line.widthSvg = svgElement.getAttribute('width');
        // line.heightSvg = svgElement.getAttribute('height');
        // //получаем оносительные координаты центра point элемента
        // const point = {};
        // point.middleX = pointElement.offsetWidth / 2;
        // point.middleY = pointElement.offsetHeight / 2;

        // // //добавляем к концу линии svg смещение к центру point
        // // console.log('line', line);
        // //оределяем точку конца линии
        // const dataRect = dataElement.getBoundingClientRect();
        // const x2 = dataRect.left;
        // const y2 = dataRect.top + dataRect.height;
        // // меняем параметры width и height svg
        // // svgElement.setAttribute('width', +line.widthSvg + +);
        // // svgElement.setAttribute('height', +line.heightSvg + +point.middleY);

        // // записываем скорректированные данные о конце линии
        // line.setAttribute('x2', +line.x2 - point.middleX);
        // line.setAttribute('y2', +line.y2 - point.middleY + y2);

        // начало координат Svg - центр pointElement
        const coords = {
            begin: {},
            end: {},
            size: {},
            offsetX: 0,
            offsetY: 0,
            svg: { x1: 0, y1: 0, x2: 0, y2: 0 },
        };
        window.coords = coords;
        const boundedPoint = pointElement.getBoundingClientRect();
        const parentRect = svgElement.parentElement.getBoundingClientRect();
        // coords.begin.x = boundedPoint.x - parentRect.x + boundedPoint.width / 2;
        // coords.begin.y =
        //     boundedPoint.y - parentRect.y + boundedPoint.height / 2;
        coords.begin.x = boundedPoint.x + boundedPoint.width / 2 - parentRect.x;
        coords.begin.y =
            boundedPoint.y + boundedPoint.height / 2 - parentRect.y;
        // конец координат Svg - нижний левый угол dataElement
        const boundedData = dataElement.getBoundingClientRect();
        coords.end.x = boundedData.left - parentRect.left;
        coords.end.y = boundedData.top + boundedData.height - parentRect.top;
        // вычислыем ширину и высоту Svg
        coords.size.width = Math.abs(coords.end.x - coords.begin.x);
        coords.size.height = Math.abs(coords.end.y - coords.begin.y);
        const distanceX = coords.end.x - coords.begin.x;
        const distanceY = coords.end.y - coords.begin.y;
        const width = Math.abs(distanceX);
        const height = Math.abs(distanceY);
        /*
                 |
            -/-  |  +/-
            ------------
            -/+  |  +/+
                 |  
        */
        if (distanceX >= 0 && distanceY > 0) {
            coords.svg.x1 = 0;
            coords.svg.y1 = 0;
            coords.svg.x2 = width;
            coords.svg.y2 = height;
            coords.offsetX = 0;
            coords.offsetY = 0;
        }
        if (distanceX >= 0 && distanceY < 0) {
            coords.svg.x1 = 0;
            coords.svg.y1 = height;
            coords.svg.x2 = width;
            coords.svg.y2 = 0;
            coords.offsetX = 0;
            coords.offsetY = -1;
        }
        if (distanceX <= 0 && distanceY < 0) {
            coords.svg.x1 = 0;
            coords.svg.y1 = 0;
            coords.svg.x2 = width;
            coords.svg.y2 = height;
            coords.offsetX = -1;
            coords.offsetY = -1;
        }
        if (distanceX <= 0 && distanceY > 0) {
            coords.svg.x1 = 0;
            coords.svg.y1 = height;
            coords.svg.x2 = width;
            coords.svg.y2 = 0;
            coords.offsetX = -1;
            coords.offsetY = 0;
        }
        //рисуем Svg
        //нужно установить  width = width, height = height, viewBox=`0 0 ${width} ${height}`, x1,y1,x2,y2
        const line = svgElement.querySelector('line');
        Object.entries(coords.svg).forEach(coord =>
            line.setAttribute(...coord),
        );
        svgElement.setAttribute('width', width);
        svgElement.setAttribute('height', height);
        svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);

        svgElement.style.left = coords.begin.x + 'px';
        svgElement.style.top = coords.begin.y + 'px';
        //перемещаем в зависимости от offset
        svgElement.style.transform += `translate(${coords.offsetX * 100}%,${
            coords.offsetY * 100
        }%)`;
    };

    points.forEach(point =>
        point.addEventListener('click', () => {
            const signElement = point.querySelector('.carousel-item__sign');
            const data = point.nextSibling;
            const svg = point.previousElementSibling;
            const switcher = {
                ['-']: () => {
                    data.style.opacity = 0;
                    signElement.textContent = '+';
                },
                ['+']: () => {
                    data.style.opacity = 1;
                    signElement.textContent = '-';
                    correctSvg(data, svg, point);
                },
            };
            switcher[signElement.textContent]();
        }),
    );
};

export default switchCarouselPoints;
