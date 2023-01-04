import { Children } from "react";
import { createBrowserRouter, Route, Router } from "react-router-dom"
import App from "../App";
import { Dashboard } from "../shared/component/Dashboard";
import { Error404 } from "../error/Error404";
import { Home } from "../module/Home"
import { Login } from "../module/Login";
import { Fees } from "../pages/Fees";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { EmployeePage } from "../pages/Employee";
import { StudentPage } from "../pages/Students";
import { Onboarding } from "../shared/component/onboarding/Onboarding";
import { OnboardingDetails } from "../pages/OnboardDetails";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes />,
        errorElement: <Error404 />,
        children: [
            {
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
                    }, {
                        path: 'staffs',
                        element: <EmployeePage />
                    }, {
                        path: 'onboarding',
                        element: <Onboarding />
                    }, {
                        path: "students",
                        element: <StudentPage />
                    }, {
                        path: 'admisssion',
                        element: <Onboarding />
                    }, {
                        path: 'employeeDetails/:id',
                        element: <OnboardingDetails />
                    }
                    , {
                        path: 'studentDetails/:id',
                        element: <OnboardingDetails />
                    }
                ]
            }
        ]
    }, {
        path: "/login",
        element: <Login />,
    }
]);
