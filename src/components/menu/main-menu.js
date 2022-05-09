import { disappear, appear } from '../../js/disappear';
const mainMenu = (element = '.main-menu') => {
    const menu = document.querySelector(element);
    const label = document.querySelector(element + '__label');
    const parent = menu.parentElement;
    console.log('🚀 ~ parent', parent);

    parent.addEventListener('click', ({ target }) => {
        console.log('🚀 ~ target', target);
        menu.classList.toggle('active');
        const match = matchMedia('(max-width: 1024px)').matches;
        console.log('🚀 ~ match', match);
        const phone = document.querySelector('h1.header__phone');
        if (match && menu.classList.contains('active')) {
            phone.style.flex = '1 1 10%';
        } else {
            phone.style.flex = '';
        }
        //switch label
        if (label && menu.classList.contains('active')) {
            disappear(label);
        } else {
            appear(label);
        }
    });
};
export default mainMenu;
