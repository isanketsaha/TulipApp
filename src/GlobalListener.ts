import { Middleware, MiddlewareAPI, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { notification } from "antd";
import { decreaseApiRequestCount, increaseApiRequestCount } from "./shared/redux/slices/GlobalAppSlice"
import { logout } from "./shared/redux/slices/UserAuthSlice"

interface NotificationProps {
  status: number
  details: string
}

const openNotification = (errorData: NotificationProps) => {
  notification.error({
    message: `${errorData.status}`,
    description: errorData.details,
  })
}

export const GlobalListener: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    api.dispatch(decreaseApiRequestCount())

    if (action.payload) {
      if (action.payload?.data) {
        openNotification({
          status: action.payload.data.title
            ? action.payload.data.title
            : action.payload.data.error + " - " + action.payload.data.status,
          details: action.payload.data.detail ? action.payload.data.detail : action.payload.data.path,
        })
      } else {
        openNotification({
          status: action.payload?.status,
          details: action.payload.error,
        })
      }

      if (action.payload?.status == "401") {
        api.dispatch(logout())
        window.location.reload()
      }
    }
  }
  if (isPending(action)) {
    api.dispatch(increaseApiRequestCount())
  }
  if (isFulfilled(action)) {
    api.dispatch(decreaseApiRequestCount())
  }
  return next(action)
}