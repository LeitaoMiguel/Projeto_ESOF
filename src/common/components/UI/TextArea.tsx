import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'

interface Props {
    id?: string;
    name: string;
    rows?: number;
    defaultValue?: string;
    placeholder?: string;
}

const TextArea = ({id, name, rows = 3, defaultValue, placeholder}: Props) => {
    return (
        <div>
            <textarea id={id} name={name} rows={rows} defaultValue={defaultValue} placeholder={placeholder}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            />
        </div>
    );
}

export default TextArea;