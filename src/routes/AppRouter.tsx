import { Children } from "react";
import { createBrowserRouter, Route, Router } from "react-router-dom"
import App from "../App";
import { Dashboard } from "../shared/component/Dashboard";
import { Error404 } from "../error/Error404";
import { Home } from "../module/Home"
import { Login } from "../module/Login";
import { Fees } from "../pages/Fees";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <Error404 />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },{
                path: "fees",
                element: <Fees />,
            },{
                path:"admission",
                element: <Dashboard />,
            },
            {
                path:"purchase",
                element: <Dashboard />,
            }
        ]
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <Error404 />
    },
    {
        path: "/",
        element: <App />,
        errorElement: <Error404 />
    }
]);
