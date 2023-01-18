import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment, useEffect } from 'react';

import { getOrders } from "../../../utils/backend/order";

import { TrashIcon} from '@heroicons/react/outline'

import WidgetLayout from "../../Layouts/WidgetLayout";

import { useSession, getSession } from "next-auth/react"

const orders_dummy = [{
    _id: "asdsdas",
    id: "#300001",
    name: "Francisco Giestas",
    email: "giestas3@gmail.com",
    date: "31 Maio de 2022",
}]

const OrdersTab = () => {
    const { data : orders, error : ordersError} = getOrders();
    const [filteredOrders, setFilteredOrders] = useState<any[]>();
    
    const { data: session, status } = useSession();

    useEffect(() => {
        if(!orders)
            return;

            setFilteredOrders(orders ? orders.filter(a => { return a.user === session.user.id }) : orders);
    }, [orders]);

    return (
        <div>
            <div className="flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            #ID Encomenda
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Data
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {/*
                                        filteredOrders ?
                                            filteredOrders.map((order) => (
                                                <tr key={order._id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="font-medium text-gray-900">{order.name}</div>
                                                                <div className="text-gray-500">{order.email}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <div className="text-gray-500">{order.date}</div>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                            Concluido
                                                        </span>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{order.role}</td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                            Detalhes
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        :
                                            <></>
                                    */}

                                    {
                                        orders_dummy.map((order) => (
                                            <tr key={order._id}>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-500">{order.id}</div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="font-medium text-gray-900">{order.name}</div>
                                                            <div className="text-gray-500">{order.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-500">{order.date}</div>
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        Concluido
                                                    </span>
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Detalhes
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersTab;