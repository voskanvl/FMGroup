class Meter {
    #value = 0;
    constructor(meterLinesRef, cb) {
        if (typeof meterLinesRef === "string")
            this.lines = [...document.querySelectorAll(meterLinesRef)];
        if (Array.isArray(meterLinesRef)) this.lines = meterLinesRef;
        this.meterContainer = this.lines[0].parentElement;
        this.handlerClicks(cb);
    }
    get value() {
        return this.#value;
    }
    set value(x) {
        this.lines[this.#value || 0].classList.remove("meter__line_current");
        this.lines[x].classList.add("meter__line_current");
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
