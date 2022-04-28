import "./sass/main.sass";

function requireAll(r) {
    r.keys().forEach(r);
}
requireAll(require.context("./assets/img/svg", true, /\.svg$/));
