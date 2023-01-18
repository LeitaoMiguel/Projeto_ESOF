

import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";

import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline'

import Link from 'next/Link'
import Image from 'next/Image'
import { useRouter } from 'next/router'

import { useSession } from "next-auth/react"

import { getUser } from "../../utils/backend/user";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

var navigation = [
    { name: 'Dashboard', href: '/admin', icon: HomeIcon },
    { name: 'Funcionários', href: '/admin/employees', icon: UsersIcon },
    { name: 'Utilizadores', href: '/admin/users', icon: MenuIcon },
    { name: 'Categorias', href: '/admin/categories', icon: FolderIcon },
    { name: 'Produtos', href: '/admin/products', icon: CalendarIcon },
    { name: 'Encomendas', href: '/admin/orders', icon: InboxIcon }
];

interface SidebarProps {
    sidebarOpen: boolean,
    setSidebarOpen: (value: boolean) => void
}

const Sidebar = (props: SidebarProps) => {
    const { data: session } = useSession();
    const { data : user, error : userError} = getUser(session);

    const router = useRouter();
    const isActive = (href) => {
        if (href == router.pathname)
            return true;
        return false;
    }

    const roleToStr = (role) => {
        switch(role) {
            case 1:
                return "Utilizador"
            case 2:
                return "Moderador"
            case 3:
                return "Administrador"
            default:
                return "Utilizador";
        }
    }

    return (
        <div>
            <Transition.Root show={props.sidebarOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 flex z-40 md:hidden" onClose={props.setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                    </Transition.Child>
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                    >
                        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-lpi-gray">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-300"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute top-0 right-0 -mr-12 pt-2">
                                    <button
                                        type="button"
                                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                        onClick={() => props.setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </button>
                                </div>
                            </Transition.Child>
                            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                                <div className="flex-shrink-0 flex items-center px-4">
                                    <Link href={"/admin"}>
                                        <img
                                            className="w-full hover:cursor-pointer"
                                            src="/icons/site_logo.png"
                                            alt="Workflow"
                                        />
                                    </Link>
                                </div>
                                <nav className="mt-5 px-2 space-y-1">
                                    {
                                        navigation.map((item) => (
                                            <div key={item.name}>
                                                <Link href={item.href}>
                                                    <div
                                                        className={classNames(
                                                            isActive(item.href) ? 'bg-lpi-gray-dark text-white' : 'text-gray-300 hover:text-white',
                                                            'group flex items-center px-2 py-2 text-sm font-medium rounded-md')}
                                                    >
                                                        <item.icon
                                                            className={classNames(
                                                                isActive(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                                'mr-3 flex-shrink-0 h-6 w-6'
                                                            )}
                                                            aria-hidden="true"
                                                        />
                                                        {item.name}
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                </nav>
                            </div>

                            <Link href="/">
                                <div className="bg-lpi-red p-1 rounded w-2/3 mx-auto text-center mb-2 text-white text-sm hover:cursor-pointer">
                                    Voltar à loja
                                </div>
                            </Link>

                            <div className="flex-shrink-0 flex bg-gray-700 p-4">
                                <div className="flex-shrink-0 group block">
                                    <div className="flex items-center">
                                        <div>
                                            <img
                                                className="inline-block h-10 w-10 rounded-full"
                                                src={ user ? (user.photo_path ? `http://localhost:8000/api/user/${user._id}/picture` : `/icons/clientarea.png`) : `/icons/clientarea.png` }
                                                alt=""
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-white">{"s"}</p>
                                            <p className="text-sm font-medium text-gray-400 group-hover:text-gray-300">Administrador</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                    <div className="flex-shrink-0 w-14">{/* Force sidebar to shrink to fit close icon */}</div>
                </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex-1 flex flex-col min-h-0 bg-lpi-gray">
                    <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4">
                            <Link href={"/admin"}>
                                <img
                                    className="w-auto hover:cursor-pointer text-white"
                                    src="/icons/site_logo.png"
                                    alt="Projeto LPI Logo"
                                />
                            </Link>
                        </div>
                        <nav className="mt-5 flex-1 px-2 space-y-1">
                            {navigation?.map((item) => (
                                <div key={item.name}>
                                    <Link href={item.href}>
                                        <div
                                            className={classNames(
                                                isActive(item.href) ? 'bg-lpi-gray-dark text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'group flex items-center px-2 py-2 text-sm font-medium rounded-md hover:cursor-pointer')}
                                        >
                                            <item.icon
                                                className={classNames(
                                                    isActive(item.href) ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
                                                    'mr-3 flex-shrink-0 h-6 w-6'
                                                )}
                                                aria-hidden="true"
                                            />
                                            {item.name}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>

                    <Link href="/">
                        <div className="bg-lpi-red p-1 rounded w-2/3 mx-auto text-center mb-2 text-white text-sm hover:cursor-pointer">
                            Voltar à loja
                        </div>
                    </Link>

                    <div className="flex-shrink-0 flex bg-lpi-gray-dark p-4">
                        <div className="flex-shrink-0 w-full group block">
                            <div className="flex items-center">
                                <div>
                                    <img
                                        className="inline-block h-9 w-9 rounded-full"
                                        src={ user ? (user.photo_path ? `http://localhost:8000/api/user/${user._id}/picture` : `/icons/clientarea.png`) : `/icons/clientarea.png` }
                                        alt="" />
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-white">{ user ? user.name + " " + user.surname : "A carregar..."}</p>
                                    <p className="text-xs font-medium text-gray-300 group-hover:text-gray-200">{ user ? roleToStr(user.role) : "A carregar..." }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;