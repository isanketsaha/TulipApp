import { useEffect } from "react"
import { Dashboard } from "../pages/Dashboard"
import { Office } from "../pages/Office"
import { Role } from "../shared/utils/Role"
import { useAppSelector } from "../store"
import { useNavigate } from "react-router-dom"

export const RouteDecider = () => {
  const navigate = useNavigate()
  const { user } = useAppSelector((app) => app.userAuth)

  useEffect(() => {
    if (user?.authority == Role.STAFF) {
      navigate("/office")
    } else {
      navigate("/home")
    }
  }, [user?.userId])
  return <></>
}
