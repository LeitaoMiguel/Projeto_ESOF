import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'

interface Props {
    id?: string;
    name: string;
    type: string;
    min?: number;
    autoComplete?: string;
}

const TextField = (props: Props) => {
    return (
        <div>
            <input name={props.name} type={props.type} autoComplete={props.autoComplete} min="0.01" max="10000.00" step="0.01"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"/>
        </div>
    );
}

export default TextField;