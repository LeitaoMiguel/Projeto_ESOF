import { createContext, useState } from "react";

export type PopupMessage = {
    type: "success" | "error" | "info" | "";
    message: string;
}

type NotificationType = {
    popupMessage: PopupMessage;
    setPopupMessage: (c: PopupMessage) => void;
};

export const NotificationContext = createContext<NotificationType>({
    popupMessage: {type: "", message: ""},
    setPopupMessage: () => {},
});

const NotificationContextProvider = ({ children }) => {
    var defaultMsg : PopupMessage = {type: "", message: ""};
    const [popupMessage, setPopupMessage] = useState<PopupMessage>(defaultMsg);

    return (
      <NotificationContext.Provider value={{ popupMessage, setPopupMessage }}>
          {children}
      </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;