//TODO:  переписать app как функциональный компонент
const routes = {
    ["/"]: () => import("./pages/app.js"),
    ["/contacts.html"]: () => import("./pages/contacts.js"),
    ["/articles.html"]: () => import("./pages/articles.js"),
    ["/production.html"]: () => import("./pages/production.js"),
};
routes[location.pathname]();
