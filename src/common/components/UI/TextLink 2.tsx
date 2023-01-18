import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'

interface Props {
    text: string;
    link: string;
}

const TextLink = (props: Props) => {
    return (
        <Link href={props.link}>
            <a className="text-indigo-600 hover:text-indigo-900">
                {props.text}
            </a>
        </Link>
    );
}

export default TextLink;