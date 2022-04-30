const lines = [...document.querySelectorAll(".meter__line")];

const val = Object.create(null, {
    value: {
        _value: 0,
        get() {
            return this._value;
        },
        set(x) {
            lines[this._value || 0].classList.remove("meter__line_current");
            lines[x].classList.add("meter__line_current");
            console.log(lines[0], this._value);
            this._value = x;
        },
        enumerable: true,
        configurable: true,
    },
});
val.value = 0;

export default val;
