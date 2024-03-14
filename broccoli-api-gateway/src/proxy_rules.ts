// Define routes and corresponding microservices
const proxyRules = [
    {
        route: "/auth",
        target: "http://localhost:3333/auth",
    },
    {
        route: "/users",
        target: "https://service.com/users/",
    },
    {
        route: "/pricing",
        target: "https://service.com/pricing/",
    },
    {
        route: "/payment",
        target: "https://service.com/payment/",
    },
];

export { proxyRules };
