import { Children } from "react";
import { createBrowserRouter, Route, Router } from "react-router-dom"
import App from "../App";
import { Dashboard } from "../shared/component/Dashboard";
import { Error404 } from "../error/Error404";
import { Home } from "../module/Home"
import { Login } from "../module/Login";
import { Fees } from "../pages/Fees";
import { ProtectedRoutes } from "./ProtectedRoutes";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes />,
        errorElement: <Error404 />,
        children: [
            {
                path: "/home",
                element: <Home />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    }, {
                        path: "fees",
                        element: <Fees />,
                    }, {
                        path: "admission",
                        element: <Dashboard />,
                    },
                    {
                        path: "purchase",
                        element: <Dashboard />,
                    }
                ]
            }
        ]
    }, {
        path: "/login",
        element: <Login />,
    }
]);
