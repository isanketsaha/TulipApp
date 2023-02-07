import { Middleware, MiddlewareAPI, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { hideSpinner, showSpinner } from "./shared/redux/slices/GlobalAppSlice";
import { logout } from "./shared/redux/slices/UserAuthSlice";
import { useNavigate } from "react-router-dom";

interface NotificationProps {
    status: number,
    details: string
}


const openNotification = (errorData: NotificationProps) => {
    notification.error({
        message: `Error ${errorData.status}`,
        description: errorData.details
    });
};


export const GlobalListener: Middleware = (api: MiddlewareAPI) => (next) => (action) => {


    if (isRejectedWithValue(action)) {
        api.dispatch(hideSpinner())

        if (action.payload) {
            if (action.payload?.data) {
                openNotification({
                    status: action.payload.data.title,
                    details: action.payload.data.detail
                });
            }
            else {
                openNotification({
                    status: action.payload?.status,
                    details: action.payload.error
                });
            }


            if (action.payload?.status == "401") {
                api.dispatch(logout())
                window.location.reload();
            }

        }

    }
    if (isPending(action)) {
        api.dispatch(showSpinner())
    }
    if (isFulfilled(action)) {
        api.dispatch(hideSpinner())
    }
    return next(action);
}