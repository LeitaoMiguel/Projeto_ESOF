

import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import {
    UserCircleIcon,
    KeyIcon,
    CreditCardIcon,
    UserGroupIcon,
    ViewGridAddIcon,
} from '@heroicons/react/outline'

import Link from 'next/Link'
import Image from 'next/Image'

import { useSession, signIn, signOut } from "next-auth/react"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigationData = [
    { name: 'Minha conta', href: '/clientarea', icon: UserCircleIcon, current: false },
    { name: 'Palavras-passe', href: '/clientarea/password', icon: KeyIcon, current: false },
    { name: 'Métodos de pagamento', href: '/clientarea/billing', icon: CreditCardIcon, current: false },
    { name: 'Moradas', href: '/clientarea/addresses', icon: UserGroupIcon, current: false },
    { name: 'Encomendas', href: '/clientarea/orders', icon: ViewGridAddIcon, current: false },
]

const Sidebar = () => {
    const [navigation, setNavigation] = useState<any[]>();

    const { data: session, status } = useSession()

    useEffect(() => {
        var currentPath = window.location.pathname;

        var navigationTemp = [];

        navigationData.forEach((n) => {
            n.current = false;
            if(n.href === currentPath)
                n.current = true;
            navigationTemp.push(n);
        });

        setNavigation(navigationTemp);
    }, []);

    return (
        <aside className="py-6 px-2 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3 space-y-6">
            <div className="px-3 flex items-center text-sm font-medium">
                <span className="text-gray-500">{session.user.email}</span>
            </div>
            <nav className="space-y-1">
                {navigation?.map((item) => (
                    <div key={item.name}>
                        <Link href={item.href}>
                            <div
                                className={classNames(
                                    item.current
                                    ? 'bg-gray-50 text-indigo-700 hover:text-indigo-700 hover:bg-white'
                                    : 'text-gray-900 hover:text-gray-900 hover:bg-gray-50',
                                    'group rounded-md px-3 py-2 flex items-center text-sm font-medium hover:cursor-pointer'
                                )}
                                aria-current={item.current ? 'page' : undefined}
                            >
                            <item.icon
                                className={classNames(
                                item.current
                                    ? 'text-indigo-500 group-hover:text-indigo-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                'flex-shrink-0 -ml-1 mr-3 h-6 w-6'
                                )}
                                aria-hidden="true"
                            />
                                <span className="truncate">{item.name}</span>
                            </div>
                        </Link>
                    </div>
                ))}
            </nav>
            <div className="mx-4 py-1 flex items-center text-sm font-medium rounded bg-red-600 hover:bg-red-700 hover:cursor-pointer"
                onClick={() => { signOut() }}
            >
                <span className="text-white mx-auto">Logout</span>
            </div>
        </aside>
    );
}

export default Sidebar;