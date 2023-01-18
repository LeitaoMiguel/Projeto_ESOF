import React, { ReactNode, Fragment, useEffect, useContext, useState} from 'react';
import Head from 'next/head';

import Image from 'next/image'
import {Dialog, Transition} from "@headlessui/react";

import Topbar from '../Topbar';
import Footer from '../Footer';

const banner = '/images/bannerbg.png'

type Props = {
    children: ReactNode;
    title?: String;
}

const baseTitle = "Entrar ou criar conta"


const MainLayout = ({ children, title = ""}: Props) => {
    return (
        <>
            <div>
                <Head>
                    <title> { (title ? (title + " | ") : "") + baseTitle } </title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="twitter:title" content="PROJETO LPI" />
                    <meta
                        name="twitter:description"
                        content="PROJETO DE LPI - MARKETPLACE"
                    />
                </Head>
            
                <div className="flex flex-col h-screen">
                    <Topbar/>

                    <div className="flex-grow bg-lpi-gray-light">
                        <div className="px-10 py-8 rounded-b-2xl w-full bg-white max-w-3xl mx-auto">
                            {children}
                        </div>
                    </div>
                    
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default MainLayout;