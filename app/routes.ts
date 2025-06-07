import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("login", "routes/login.tsx"),
    ...prefix("admin", [
            index("routes/admin-login.tsx"),
            route("dashboard", "routes/admin-dashboard.tsx")
        ]),
    layout("layouts/product-layout.tsx", [
        ...prefix("products", [
            index("routes/product-list.tsx"),
            route(":productId", "routes/product-detail.tsx"),
            route("update/:productId", "routes/product-update.tsx"),
        ]),
    ]),

    // route("cart", "routes/cart.tsx"),
    // route("profile", "pages/ProfileView/ProfileView.tsx"),
    // route("*", "routes/error.tsx")
] satisfies RouteConfig;
