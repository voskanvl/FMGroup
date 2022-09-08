export class Counter {
    #_counter = 0;
    #subscribers = [];
    #elements = [];
    static #instance;

    constructor() {
        if (Counter.#instance) return Counter.#instance;
        Counter.#instance = this;
        return this;
    }

    get value() {
        return this.#_counter;
    }
    set value(x) {
        this.#cast({ prev: this.#_counter, current: x });
        this.#_counter = x;
    }
    inc() {
        console.log("inc");
        this.value++;
    }
    dec() {
        this.value--;
    }
    clear() {
        this.value = 0;
    }
    subscribe(cb) {
        this.#subscribers.push(cb);
    }
    unsubscribe(cb) {
        this.#subscribers = this.#subscribers.filter(e => e !== cb);
    }
    #cast({ prev, current }) {
        this.#subscribers.forEach(cb => cb({ prev, current }));
        this.#elements.forEach(e => (e.textContent = this.#_counter));
    }
    assoc(element) {
        this.#elements.push(element);
        element.textContent = this.#_counter;
    }
    unassoc(element) {
        this.#elements.filter(e => e !== element);
    }
}
