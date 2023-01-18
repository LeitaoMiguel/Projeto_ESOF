import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment } from 'react';
import Head from 'next/head';

import Topbar from '../Topbar';
import Footer from '../Footer';
import Sidebar from '../ClientArea/Sidebar';

const ClientAreaLayout = ({ children, title="", description="" }) => {
    return (
        <>
            <div>
                <Head>
                    <title> { (title ? (title + " | ") : "")} </title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                    <meta name="twitter:title" content="Paiva Hidraulica" />
                    <meta
                        name="twitter:description"
                        content="Paiva Hidraulica"
                    />
                </Head>
            
                <div className="flex flex-col h-screen">
                    <Topbar/>

                    <div className="flex-grow bg-lpi-gray-light">
                        <div className="max-w-7xl mx-auto py-8">
                            <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
                                <Sidebar/>
                        
                                <div className="sm:px-6 lg:px-0 lg:col-span-9 space-y-4">
                                    <div>
                                        <h3 className="text-2xl leading-6 font-medium text-gray-900">{title}</h3>
                                        <p className="mt-1 text-gray-500">{description}</p>
                                    </div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <Footer/>
                </div>
            </div>
        </>
    )
}

export default ClientAreaLayout;