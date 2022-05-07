class Tabs {
    #listeners = [];
    constructor(tabs = '.tabs') {
        if (typeof tabs === 'string')
            this.tabsElement = document.querySelector(tabs);
        if (tabs.__proto__.constructor.name.includes('HTML'))
            this.tabsElement = tabs;
        this.tabs = this.tabsElement.children;
        this.currentTab = 0;
        this.tabs[this.currentTab].classList.add('active');
        this.handler = this.handler.bind(this);
        this.tabsElement.addEventListener('click', this.handler);
    }
    addEventListener(listener) {
        this.#listeners.push(listener);
    }
    removeEventListener(listener) {
        this.#listeners.push(listener);
    }
    handler({ target }) {
        const tab = target.closest('.tab');
        if (tab && tab.dataset.id) {
            this.tabs[this.currentTab].classList.remove('active');
            tab.classList.add('active');
            this.currentTab = tab.dataset.id;
            if (this.#listeners) {
                this.#listeners.forEach(cb => cb(this.currentTab));
            }
        }
    }
}
// const tabsElement = document.querySelector('.tabs');
// const tabs = tabsElement.children;
// let currentTab = 0;
// const init = cb => {
//     tabsElement.children[currentTab].classList.add('active');
//     //--- навешиваем обработчик на tabs
//     tabsElement.addEventListener('click', ({ target }) => {
//         const tab = target.closest('.tab');
//         if (tab && tab.dataset.id) {
//             tabs[currentTab].classList.remove('active');
//             tab.classList.add('active');
//             currentTab = tab.dataset.id;
//             if (cb) cb(+currentTab);
//         }
//     });
// };
export default Tabs;
