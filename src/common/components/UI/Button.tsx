import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

interface ButtonProps {
    text: string;
    type: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const TextLink = (props: ButtonProps) => {
    return (
        <button type={props.type as "button" | "submit" | "reset"} onClick={props.onClick} className="bg-primary hover:bg-primary-hover text-gray-100 rounded-xl px-2 py-1"><span className="font-bold">{props.text}</span></button>
    );
}

export default TextLink;