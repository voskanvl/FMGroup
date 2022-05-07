//TODO:  переписать app как функциональный компонент
const routes = {
    ["/"]: () => import("./pages/app.js"),
    ["/contacts.html"]: () => import("./pages/contacts.js"),
    ["/articles.html"]: () => {
        console.log("this is articles");
    },
    ["/production.html"]: () => import("./pages/production.js"),
};
routes[location.pathname]();
