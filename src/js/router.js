const routes = {
    ["/"]: () => {
        import("./pages/app.js");
    },
    ["/contacts.html"]: () => {
        import("./pages/contacts.js");
    },
    ["/articles.html"]: () => {
        import("./pages/articles.js");
    },
    ["/production.html"]: () => {
        import("./pages/production.js");
    },
    ["/about.html"]: () => {
        import("./pages/about.js");
    },
    ["/projects.html"]: () => {
        import("./pages/projects.js");
    },
    ["/blank.html"]: () => {
        import("./pages/blank.js");
    },
};
routes[location.pathname]();
