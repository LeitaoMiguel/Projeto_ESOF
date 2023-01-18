import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

type PopupMessage = {
    msg: string;
    hint: string;
    icon: string;
}

interface PopupProps {
    showPopup: boolean;
    setShowPopup: Function;
    popupMessage: PopupMessage;
    setPopupMessage: Function;
}

const PopupBalloon = (props: PopupProps) => {
    const [timeoutID, setTimeoutID] = useState<NodeJS.Timeout>(null);

    useEffect(() => {
        if (props.popupMessage.msg !== "Loading...") {
            props.setShowPopup(true);
            clearTimeout(timeoutID);
            setTimeoutID(setTimeout(() => {
                props.setShowPopup(false)
                props.setPopupMessage({ msg: "Loading...", hint: "", icon: "success" })
            }, 5000))
        }
    }, [props.popupMessage])

    return (
        <Transition
            as={Fragment}
            show={props.showPopup}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
        >
            <div className="fixed inset-0 flex items-end justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-10">
                <div className="max-w-sm w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto">
                    <div className="rounded-lg shadow-xs overflow-hidden">
                        <div className="p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <svg className="h-6 w-6 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-3 w-0 flex-1 pt-0.5">
                                    <p className="text-sm font-medium text-white">
                                        { props.popupMessage.msg }
                                    </p>
                                    <p className="mt-1 text-sm text-white">
                                        { props.popupMessage.hint }
                                    </p>
                                </div>
                                <div className="ml-4 flex-shrink-0 flex">
                                    {
                                        props.popupMessage.icon === "success" ?
                                            <button className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" onClick={() => props.setShowPopup(false)}>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                            :
                                            <button className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150" onClick={() => props.setShowPopup(false)}>
                                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    );
}

export default PopupBalloon;