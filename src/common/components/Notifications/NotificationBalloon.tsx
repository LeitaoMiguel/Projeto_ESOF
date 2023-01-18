import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import { CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XIcon } from '@heroicons/react/outline'

type PopupMessage = {
    type: "success" | "error" | "info" | "";
    message: string;
}

interface PopupProps {
    showPopup: boolean;
    setShowPopup: Function;
    popupMessage: PopupMessage;
    setPopupMessage: Function;
}

const NotificationBalloon = (props: PopupProps) => {
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>(null);

    const getTitleMessage = (type) => {
        switch(type) {
            case 'success':
                return 'Sucesso!';
            case 'error':
                return 'Erro!';
            case 'info':
                return 'Informação';
            default:
                return "";
        }
    }

    const getIcon = (type) => {
        switch(type) {
            case 'success':
                return <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />;
            case 'error':
                return <ExclamationCircleIcon className="h-6 w-6 text-red-400" aria-hidden="true" />;
            case 'info':
                return <InformationCircleIcon className="h-6 w-6 text-blue-400" aria-hidden="true" />;
            default:
                return <></>;
        }
    }

    useEffect(() => {
        if (props.popupMessage.message !== "") {
            props.setShowPopup(true);
            clearTimeout(timeoutID);
            setTimeoutID(setTimeout(() => {
                props.setShowPopup(false)
                props.setPopupMessage({ type: "", message: "" })
            }, 5000))
        }
    }, [props.popupMessage])

    return (
        <div
            aria-live="assertive"
            className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-10"
        > 
            <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
                {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                <Transition
                    show={props.showPopup}
                    as={Fragment}
                    enter="transform ease-out duration-300 transition"
                    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    { getIcon(props.popupMessage.type) }
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-gray-900">
                                        { getTitleMessage(props.popupMessage.type) }
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500"> { props.popupMessage.message }</p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    <button
                                        className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        onClick={() => {
                                            props.setShowPopup(false)
                                        }}
                                    >
                                        <span className="sr-only">Close</span>
                                        <XIcon className="h-5 w-5" aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    );
}

export default NotificationBalloon;