/*
    params
        points:HTMLElemnt[] - массив точек управления в текущем слайде слайдера
*/

export const correctSvg = (dataElement, svgElement, pointElement) => {
    const coords = {
        begin: {},
        end: {},
        size: {},
        offsetX: 0,
        offsetY: 0,
        svg: { x1: 0, y1: 0, x2: 0, y2: 0 },
    };
    const boundedPoint = pointElement.getBoundingClientRect();
    const parentRect = svgElement.parentElement.getBoundingClientRect();

    coords.begin.x = boundedPoint.x + boundedPoint.width / 2 - parentRect.x;
    coords.begin.y = boundedPoint.y + boundedPoint.height / 2 - parentRect.y;

    // конец координат Svg - нижний левый угол dataElement
    const boundedData = dataElement.getBoundingClientRect();
    //пускай конец координат Svg - нижний левый или правый угол dataElement, что находится ближе к началу координат Svg
    const corners = { left: {}, right: {} };
    corners.left.x = boundedData.left - parentRect.left;
    corners.left.y = boundedData.top - parentRect.top + boundedData.height;

    corners.right.x = boundedData.left + boundedData.width - parentRect.left;
    corners.right.y = boundedData.top - parentRect.top + boundedData.height;

    //определяем какие координаты ближе
    const sRight = Math.sqrt(
        Math.pow(corners.right.x - coords.begin.x, 2) +
            Math.pow(corners.right.y - coords.begin.y, 2),
    );
    const sLeft = Math.sqrt(
        Math.pow(corners.left.x - coords.begin.x, 2) +
            Math.pow(corners.left.y - coords.begin.y, 2),
    );
    if (sRight <= sLeft) {
        coords.end = corners.right;
    } else {
        coords.end = corners.left;
    }

    // вычисляем ширину и высоту Svg
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
    const line = svgElement.querySelector("line");
    Object.entries(coords.svg).forEach(coord => line.setAttribute(...coord));
    svgElement.setAttribute("width", width);
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

    svgElement.style.left = coords.begin.x + "px";
    svgElement.style.top = coords.begin.y + "px";
    //перемещаем в зависимости от offset
    svgElement.style.transform = `translate(${coords.offsetX * 100}%,${
        coords.offsetY * 100
    }%)`;
};
//можно уменьшить связаность плучив listener в параметры
export const switchCarouselPoints = () => {
    const listener = document.querySelector(".carousel");
    listener.addEventListener("click", ({ target }) => {
        const point = target.closest(".carousel-item__point");
        if (point) {
            const signElement = point.querySelector(".carousel-item__sign");
            const data = point.querySelector(".carousel-item__point-data");
            const svg = point.querySelector(".carousel-item__point-svg");
            const switcher = {
                ["-"]: () => {
                    data.style.opacity = 0;
                    signElement.textContent = "+";
                    svg.style.opacity = 0;
                },
                ["+"]: () => {
                    data.style.opacity = 1;
                    signElement.textContent = "-";
                    correctSvg(data, svg, point);
                    svg.style.opacity = 1;
                },
            };
            switcher[signElement.textContent]();
        }
    });
};

export default { switchCarouselPoints, correctSvg };
