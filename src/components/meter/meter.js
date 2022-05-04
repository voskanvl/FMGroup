class Meter {
    #value = 0;
    constructor(meterLinesRef) {
        if (typeof meterLinesRef === 'string')
            this.lines = [...document.querySelectorAll(meterLinesRef)];
        if (Array.isArray(meterLinesRef)) this.lines = meterLinesRef;
    }
    get value() {
        return this.#value;
    }
    set value(x) {
        this.lines[this.#value || 0].classList.remove('meter__line_current');
        this.lines[x].classList.add('meter__line_current');
        this.#value = x;
    }
}

export default Meter;
