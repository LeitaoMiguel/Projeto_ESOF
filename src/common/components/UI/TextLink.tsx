import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'

interface TextLinkProps {
    text: string;
    link: string;
}

const TextLink = (props: TextLinkProps) => {
    return (
        <Link href={props.link}>
            <a className="text-primary font-semibold hover:text-primary-hover hover:underline">{props.text}</a>
        </Link>
    );
}

export default TextLink;