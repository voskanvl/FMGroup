import './sass/main.sass';
import './js/app.js';

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context('./assets/img/svg', true, /\.svg$/));
