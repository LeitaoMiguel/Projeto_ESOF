import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    text: string;
    type: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SecondaryButton = (props: Props) => {
    return (
        <button type={props.type as "button" | "submit" | "reset"} onClick={props.onClick}
            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white
            text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
        >
            {props.text}
        </button>
    );
}

export default SecondaryButton;