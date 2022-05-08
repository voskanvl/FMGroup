//TODO:  переписать app как функциональный компонент
const routes = {
    ["/"]: () => {
        console.log("сработал роут - /");
        import("./pages/app.js");
    },
    ["/contacts.html"]: () => {
        console.log("сработал роут - /contacts.html");
        import("./pages/contacts.js");
    },
    ["/articles.html"]: () => {
        console.log("сработал роут - /articles.html");
        import("./pages/articles.js");
    },
    ["/production.html"]: () => {
        console.log("сработал роут - /production.html");
        import("./pages/production.js");
    },
    ["/about.html"]: () => {
        console.log("сработал роут - /about.html");
        import("./pages/about.js");
    },
    ["/projects.html"]: () => {
        console.log("сработал роут - /projects.html");
        import("./pages/projects.js");
    },
};
routes[location.pathname]();
