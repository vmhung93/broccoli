// Define routes and corresponding microservices
const PROXY_RULES = [
    {
        route: "/auth",
        target: "http://localhost:3001/auth/",
        auth: false,
    },
    {
        route: "/user",
        target: "http://localhost:3001/user/",
        auth: true,
    },
    {
        route: "/product",
        target: "http://localhost:3002/product/",
        auth: true,
    },
    {
        route: "/payment",
        target: "https://service.com/payment/",
        auth: true,
    },
];

export default PROXY_RULES;
