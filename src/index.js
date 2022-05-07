import "./js/router.js";

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context("./assets/img/svg", true, /\.svg$/));
