import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    text: string;
    type: string;
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PrimaryButton = (props: Props) => {
    return (
        <button disabled={props.disabled} type={props.type as "button" | "submit" | "reset"} onClick={props.onClick}
            className="w-full inline-flex justify-center rounded-md border border-transparent
            shadow-sm px-4 py-2 bg-lpi-red text-base font-medium text-white hover:bg-lpi-red-dark
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm
            disabled:opacity-40"
        >
            {props.text}
        </button>
    );
}

export default PrimaryButton;