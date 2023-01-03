import { Middleware, MiddlewareAPI, isFulfilled, isPending, isRejectedWithValue } from "@reduxjs/toolkit";
import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
import { hideSpinner, showSpinner } from "./shared/redux/slices/GlobalAppSlice";
 



const openNotification = (errorData: any) => {
    notification.error({
      message: `Error ${errorData.status}`,
      description: errorData.detail
    });
  };

  
export const GlobalListener : Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    
    if (isRejectedWithValue(action)) {
        api.dispatch(hideSpinner())
        openNotification(action.payload?.data);

        
    }
    if(isPending(action)){
        api.dispatch(showSpinner())
    }
    if(isFulfilled(action)){
        api.dispatch(hideSpinner())
    }
    return next(action);
}