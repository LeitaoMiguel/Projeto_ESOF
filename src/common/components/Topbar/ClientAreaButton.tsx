import { Fragment, useState, useContext, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, XIcon, TrashIcon } from '@heroicons/react/solid'

import Link from 'next/Link'

import { PrimaryButton, TextField, TextLink } from '../UI'

import NotificationEmitter from "../Notifications/NotificationEmitter";

import { useSession, getSession, signIn, signOut } from "next-auth/react"
import { getUser } from "../../utils/backend/user";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ClientAreaButton = () => {
    const { data: session, status } = useSession();
    const { data: user, error: userError } = getUser(session);

    const form = useRef(null)

    const { emitNotification } = NotificationEmitter();

    const loginUser = async (event) => {
        event.preventDefault()
        
        try {
            signIn("credentials", { email: event.target.email.value, password: event.target.password.value });
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <Popover.Button>
                        {
                            user ?
                                <div className="transition-transform duration-150 ease-out hover:scale-110">
                                    <div className="flex items-center rounded-full hover:bg-lpi-gray-dark hover:cursor-pointer space-x-2 p-1">
                                        <div className="w-10">
                                            <img
                                                className="inline-block h-10 w-10 rounded-full"
                                                src={user.photo ? `http://localhost:8000/api/user/${user._id}/picture` : `/icons/clientarea.png`}
                                                alt={"clientarea"}
                                            />
                                        </div>
                                        <span className="text-white text-sm">{user.name + " " + user.surname}</span>
                                    </div>
                                </div>
                            :
                                <div className="transition-transform duration-150 ease-out hover:scale-110">
                                    <div className="flex items-center rounded-full hover:bg-lpi-gray-dark hover:cursor-pointer space-x-2 p-1">
                                        <div className="w-10">
                                            <img
                                                src={`/icons/clientarea.png`}
                                                alt={"clientarea"}
                                            />
                                        </div>
                                        <span className="text-white text-sm">{"Área Cliente"}</span>
                                    </div>
                                </div>
                        }
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-20 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                            {
                                user ?
                                    <div className="rounded-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                        <Link href="/clientarea">
                                            <div className="p-3 text-gray-800 hover:bg-gray-200 hover:cursor-pointer">
                                                Definições
                                            </div>
                                        </Link>
                                        <div className="p-3 text-gray-800 hover:bg-gray-200 hover:cursor-pointer" onClick={signOut}>
                                            Logout
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <form onSubmit={loginUser}>
                                            <div className="rounded-t-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="p-4">
                                                    <div className="flex">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Entre</h3>
                                                            <div className="flex space-x-1 text-sm">
                                                                <span className="text-gray-700">Ainda não tem uma conta?</span> <TextLink text="Crie uma." link="/register"/>
                                                            </div>
                                                        </div>

                                                        <Popover.Button>
                                                            <div className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                                <span className="sr-only">Close</span>
                                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                                            </div>
                                                        </Popover.Button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="px-4 py-3">
                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-700">
                                                            Endereço de email
                                                        </div>
                                                        <TextField name="email" type="text" autoComplete="email"/>
                                                        <div className="text-xs font-black text-red-500">
                                                            {/*emailError*/}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-1">
                                                        <div className="text-sm text-gray-700">
                                                            Senha
                                                        </div>
                                                        <TextField name="password" type="password"/>
                                                        <div className="text-xs font-black text-red-500">
                                                            {/*passwordError*/}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="rounded-b-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                                <div className="p-4">
                                                    <div className="grid grid-cols-6 gap-2">
                                                        <div className="col-span-6 sm:col-span-3">

                                                        </div>
                                                        <div className="col-span-6 sm:col-span-3">
                                                            <PrimaryButton type="submit" text="Entrar"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                            }
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default ClientAreaButton;