
import { createBrowserRouter } from "react-router-dom"
import { Dashboard } from "../pages/Dashboard";
import { Error404 } from "../error/Error404";
import { Home } from "../module/Home"
import { Login } from "../module/Login";
import { Payment } from "../pages/Payment";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { EmployeePage } from "../pages/Employee";
import { StudentPage } from "../pages/Students";
import { Onboarding } from "../shared/component/onboarding/Onboarding";
import { ViewDetails } from "../pages/ViewDetails";
import { Classroom } from "../pages/Classroom";
import { Accounts } from "../pages/Account";
import { PurchaseSummary } from "../pages/PurchaseSummary";
import { AuthRotes } from "./AuthRoters";
import { Role } from "../shared/utils/Role";


export const AppRouter = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoutes />,
        children: [
            {
                errorElement: <Error404 />,
                element: <Home />,
                children: [
                    {
                        index: true,
                        element: <Dashboard />,
                    }, {
                        path: "payment/:id/:classId",
                        element: <Payment />,
                    }, {
                        path: 'staffs',
                        element: <EmployeePage />
                    }, {
                        path: 'onboarding',
                        element: <AuthRotes roles={[Role.ADMIN, Role.PRINCIPAL]}><Onboarding /></AuthRotes>
                    }, {
                        path: "students",
                        element: <StudentPage />
                    }, {
                        path: 'admisssion',
                        element: <AuthRotes roles={[Role.ADMIN, Role.PRINCIPAL, Role.STAFF]}><Onboarding /></AuthRotes>
                    }, {
                        path: 'employeeDetails/:id',
                        element: <ViewDetails />
                    }
                    , {
                        path: 'studentDetails/:id',
                        element: <ViewDetails />
                    }, {
                        path: 'classroom',
                        element: <Classroom />
                    }, {
                        path: 'accounts',
                        element: <AuthRotes roles={[Role.ADMIN]}><Accounts /></AuthRotes>,
                    }, {
                        path: 'purchaseSummary/:id',
                        element: <PurchaseSummary />
                    }
                ]
            }
        ]
    }, {
        path: "/login",
        element: <Login />,
    }
]);
