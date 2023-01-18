import { useState, useEffect } from 'react';
import {useContext} from 'react';

import { NotificationContext } from "./NotificationContextProvider";

const NotificationEmitter = () => {
    const {popupMessage, setPopupMessage} = useContext(NotificationContext);

    const emitNotification = (type, message?) => {
        if(!message)
            return;

        const possibilities = ["success", "error", "info"]

        if (!possibilities.some(v => type.includes(v)))
            type = "info";

        setPopupMessage( { type: type, message: message } );
    };

    return { emitNotification }
}

export default NotificationEmitter;