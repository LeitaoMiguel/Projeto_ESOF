import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, useEffect, Fragment } from 'react';

import { getAddresses, deleteAddress } from "../../utils/backend/address";

import NotificationEmitter from "../Notifications/NotificationEmitter";

import { TrashIcon } from '@heroicons/react/outline'

import WidgetLayout from "../Layouts/WidgetLayout";

import { useSession, getSession } from "next-auth/react"

const dummyData = [{
    _id: "asdsdas",
    nome: "Francisco Giestas",
    numero: "**** **** **** 4912",
    validade: "06/24"
}]

interface Props {
    selectedPaymentOpt: String;
    setSelectedPaymentOpt: (String) => void;
}

const BillingTab = (props:Props) => {
    const { data : addressess, error : categoriesError} = getAddresses();
    const [filteredAddressess, setFilteredAddressess] = useState<any[]>();

    const { emitNotification } = NotificationEmitter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if(!addressess)
            return;

        if(!session)
            return;

        setFilteredAddressess(addressess ? addressess.filter(a => { return a.user === session.user.id }) : addressess);
    }, [addressess, session]);

    const onPaymentOptSelect = async (event) => {
        props.setSelectedPaymentOpt(event.target.value);
        
        emitNotification("success", "Método de pagamento selecionado!");
    }

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
                                            Nome
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Número
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Tipo
                                        </th>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Validade
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Ações</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {dummyData.slice(0).reverse().map((d, addressIdx) => (
                                        <tr key={d._id} className={addressIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{d.nome}</div>
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{d.numero}</div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    <div className="w-14">
                                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"/>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{d.validade}</div>
                                            </td>

                                            <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                                                <div className="flex space-x-4 items-center">
                                                    <input
                                                        type="radio"
                                                        value={d._id}
                                                        checked={props.selectedPaymentOpt === d._id}
                                                        onChange={onPaymentOptSelect}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BillingTab;