import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Role } from "../shared/utils/Role"
import { useAppSelector } from "../store"

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
