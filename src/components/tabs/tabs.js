class Tabs {
    #listeners = [];
    constructor(tabs = '.tabs') {
        if (typeof tabs === 'string')
            this.tabsElement = document.querySelector(tabs);
        if (tabs.__proto__.constructor.name.includes('HTML'))
            this.tabsElement = tabs;
        this.tabs = this.tabsElement.children;
        this.currentTab = 0;
        this.prevTab = undefined;
        this.tabs[this.currentTab].classList.add('active');
        this.handler = this.handler.bind(this);
        this.tabsElement.addEventListener('click', this.handler);
    }
    addEventListener(listener) {
        this.#listeners.push(listener);
    }
    removeEventListener(listener) {
        this.#listeners = this.#listeners.filter(el => el === listener);
    }
    handler({ target }) {
        const tab = target.closest('.tab');
        if (tab && tab.dataset.id) {
            this.tabs[this.currentTab].classList.remove('active');
            tab.classList.add('active');
            this.prevTab = this.currentTab;
            this.currentTab = tab.dataset?.id;
            if (this.#listeners) {
                this.#listeners.forEach(cb => cb(this.currentTab));
            }
        }
    }
}
export default Tabs;
