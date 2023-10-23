import { createBrowserRouter } from "react-router-dom"
import { Error404 } from "../error/Error404"
import { Home } from "../module/Home"
import { Login } from "../module/Login"
import { Social } from "../module/Social"
import { Accounts } from "../pages/Account"
import { Classroom } from "../pages/Classroom"
import { Dashboard } from "../pages/Dashboard"
import { EmployeePage } from "../pages/Employee"
import { Office } from "../pages/Office"
import { Payment } from "../pages/Payment"
import { PurchaseSummary } from "../pages/PurchaseSummary"
import { ResetCredential } from "../pages/ResetCredential"
import { StudentPage } from "../pages/Students"
import { ViewDetails } from "../pages/ViewDetails"
import { Onboarding } from "../shared/component/onboarding/Onboarding"
import { DuePayment } from "../shared/component/payment/DuesPayment"
import { Role } from "../shared/utils/Role"
import { AuthRotes } from "./AuthRoters"
import { ProtectedRoutes } from "./ProtectedRoutes"
import { RouteDecider } from "./RouteDecider"

export const AppRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/reset",
        element: <ResetCredential />,
      },
      {
        errorElement: <Error404 />,
        element: <Home />,
        children: [
          {
            path: "/",
            element: <RouteDecider />,
          },
          {
            path: "/home",
            element: <Dashboard />,
          },
          {
            path: "/office",
            element: <Office />,
          },
          {
            path: "payment/:id/:classId",
            element: <Payment />,
          },
          {
            path: "staffs",
            element: <EmployeePage />,
          },
          {
            path: "onboarding",
            element: (
              <AuthRotes roles={[Role.ADMIN, Role.PRINCIPAL]}>
                <Onboarding />
              </AuthRotes>
            ),
          },
          {
            path: "students",
            element: <StudentPage />,
          },
          {
            path: "admisssion",
            element: (
              <AuthRotes roles={[Role.ADMIN, Role.PRINCIPAL, Role.STAFF]}>
                <Onboarding />
              </AuthRotes>
            ),
          },
          {
            path: "employeeDetails/:id",
            element: <ViewDetails />,
          },
          {
            path: "studentDetails/:id",
            element: <ViewDetails />,
          },
          {
            path: "classroom",
            element: <Classroom />,
          },
          {
            path: "accounts",
            element: (
              <AuthRotes roles={[Role.ADMIN]}>
                <Accounts />
              </AuthRotes>
            ),
          },
          {
            path: "purchaseSummary/:id",
            element: <PurchaseSummary />,
          },
          {
            path: "duePayment/:id",
            element: <DuePayment />,
          },
          {
            path: "edit/:id",
            element: (
              <AuthRotes roles={[Role.ADMIN, Role.PRINCIPAL, Role.STAFF]}>
                <Onboarding />
              </AuthRotes>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/social",
    element: <Social />,
  },
  {
    path: "/*",
    element: <RouteDecider />,
  },
])
