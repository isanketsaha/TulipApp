import { notification } from "antd";
import { NotificationType } from "../shared/interface/NotificationResponse";


export const Notification = (type: NotificationType, description: string) => {

  const config = {
    message: type,
    description: description

  }
  type === NotificationType.SUCCESS ?
    notification.success(config) : notification.error(config);
}

