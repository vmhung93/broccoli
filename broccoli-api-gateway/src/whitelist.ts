// Define whitelist - List of public APIs
const WHITELIST = [
    {
        method: "GET",
        path: "/product",
        regex: `^\/product$`,
    },
    {
        method: "GET",
        path: "/product/:id",
        regex: `^\/product\/[^\/?]+$`,
    },
];

export default WHITELIST;
