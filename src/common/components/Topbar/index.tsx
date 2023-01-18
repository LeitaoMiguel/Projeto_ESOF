
import React, {Fragment, useEffect, useLayoutEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'
import Image from 'next/Image'

import { useSession, signIn, signOut } from "next-auth/react"

import CartButton from './CartButton'
import ClientAreaButton from './ClientAreaButton'

import { getUser } from "../../utils/backend/user";

const topMenu = [
    {
        id: 1,
        name: "Empresa",
        href: "/#"
    },
    {
        id: 2,
        name: "Contactos",
        href: "/#"
    },
    {
        id: 3,
        name: "Apoio ao Cliente",
        href: "/#"
    },
    {
        id: 4,
        name: "Recrutamento",
        href: "/#"
    },
]

const Topbar = () => {
    const { data: session } = useSession();
    const { data : user, error : userError} = getUser(session);

    return (
        <div className="">
            <div className="bg-lpi-red px-4 text-sm">
                <div className="justify-between text-white max-w-7xl mx-auto flex items-center">
                    <div className="flex">
                        {
                            topMenu.map((menuLink) => {
                                return (
                                    <div key={menuLink.id} className="hover:bg-red-800 py-2 px-3">
                                        <Link href={`${menuLink.href}`}>
                                            <a className="text-white hover:text-gray-200 hover:underline" key={menuLink.id}> {menuLink.name}</a>
                                        </Link>
                                    </div>
                                );
                            })
                        }
                    </div>
                    {
                        user ?
                            user.role >= 0 ?
                                <>
                                    <div className="bg-gray-900 bg-opacity-40 rounded-lg py-1 px-2 space-x-2">
                                        <Link href="/admin">
                                            <a className="text-white text-xs">
                                                ADMIN PANEL
                                            </a>
                                        </Link>
                                    </div>
                                </>
                            :
                                <> </>
                        :
                            <> </>
                    }
                </div>
            </div>
            
            <div className="bg-lpi-gray py-6 px-4">
                <div className="space-x-4 text-white max-w-7xl mx-auto justify-between flex items-center">

                    <div className="grid grid-cols-4 gap-10 items-center mx-auto w-full">
                        <div className="col-span-1">
                            <Link href="/#">
                                <div className="w-full hover:cursor-pointer">
                                    <img
                                        className="w-full hover:cursor-pointer"
                                        src="/icons/site_logo.png"
                                        alt="Workflow"
                                    />
                                </div> 
                            </Link>
                        </div>
                        <div className="col-span-2">
                            <div className="bg-gray-700 rounded-lg shadow p-1 flex">
                                <input className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    type="text" placeholder="Procurar..." aria-label="Barra de pesquisa"/>
                                <div className="bg-lpi-gray-dark hover:bg-lpi-gray hover:cursor-pointer rounded-lg shadow p-2 text-white text-center">
                                    <span>
                                        Procurar
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="flex space-x-8 items-center w-full justify-end">
                                <div className="mt-1">
                                    <CartButton/>
                                </div>

                                <div className="mt-1">
                                    <ClientAreaButton/>
                                </div>

                                {/*
                                <Link href="/clientarea">
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
                                </Link>
                                */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;