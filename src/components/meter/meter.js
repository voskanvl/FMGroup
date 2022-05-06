/*
prarams
    meterLinesRef: string | HTMLElement[] - селектор или массив на управляющие элементы (lines),
    cb: function - коллбэк, вызывается при клике на управляющий элемент, номер элемента передается в коллбэк
    colors: string[] - массив цветов для переключения цветов управляющих элементов. 
                       Элемент массива должен соответсвовать цвету Meter в переключаемой странице.
                       Количество элементов массива colors, должно соотвествовать количеству элементов управления (lines)
*/
class Meter {
    #value = 0;
    constructor(meterLinesRef, cb, colors) {
        if (typeof meterLinesRef === "string")
            this.lines = [...document.querySelectorAll(meterLinesRef)];
        if (Array.isArray(meterLinesRef)) this.lines = meterLinesRef;
        this.meterContainer = this.lines[0].parentElement;
        if (!colors) {
            this.colors = this.lines.map(() => "#777");
        } else {
            this.colors = colors;
        }
        this.lines.forEach(
            line => (line.style.backgroundColor = this.colors[0]),
        );
        this.handlerClicks(cb);
    }
    get value() {
        return this.#value;
    }
    set value(x) {
        this.lines[this.#value || 0].classList.remove("meter__line_current");
        this.lines[x].classList.add("meter__line_current");
        this.lines.forEach(
            line => (line.style.backgroundColor = this.colors[x]),
        );
        this.#value = x;
    }
    handlerClicks(cb) {
        if (this.meterContainer)
            this.meterContainer.addEventListener("click", ({ target }) => {
                const id = target?.dataset?.id;
                if (id) {
                    cb(id);
                }
            });
    }
}

export default Meter;
