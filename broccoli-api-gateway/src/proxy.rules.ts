// Define routes and corresponding microservices
const proxyRules = [
    {
        route: "/auth",
        target: "http://localhost:3001/auth/",
        auth: false,
    },
    {
        route: "/users",
        target: "http://localhost:3333/users/",
        auth: true,
    },
    {
        route: "/cart",
        target: "https://service.com/cart/",
        auth: true,
    },
    {
        route: "/payment",
        target: "https://service.com/payment/",
        auth: true,
    },
];

export default proxyRules;
