import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, useEffect, Fragment } from 'react';

import { getAddresses, deleteAddress } from "../../../utils/backend/address";

import NotificationEmitter from "../../Notifications/NotificationEmitter";

import { TrashIcon } from '@heroicons/react/outline'

import WidgetLayout from "../../Layouts/WidgetLayout";

import { useSession, getSession } from "next-auth/react"

const AddressesTab = () => {
    const { data : addressess, error : categoriesError} = getAddresses();
    const [filteredAddressess, setFilteredAddressess] = useState<any[]>();

    const { emitNotification } = NotificationEmitter();

    const { data: session, status } = useSession();

    useEffect(() => {
        if(!addressess)
            return;

        setFilteredAddressess(addressess ? addressess.filter(a => { return a.user === session.user.id }) : addressess);
    }, [addressess]);

    const deleteAddressRequest = async (event) => {
        event.preventDefault();

        var id = event.target.id.value;
        await deleteAddress(id);
        
        emitNotification("success", "Morada removida");
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
                                            Rua
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Cidade
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Estado
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            País
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Zip
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {filteredAddressess?.slice(0).reverse().map((address, addressIdx) => (
                                        <tr key={address._id} className={addressIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.full_name}</div>
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.street}</div>
                                            </td>
                                            
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.city}</div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.state}</div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.country}</div>
                                            </td>

                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{address.zip}</div>
                                            </td>

                                            <td className="relative whitespace-nowrap py-4 text-right text-sm font-medium">
                                                <div className="flex space-x-4 items-center">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Editar
                                                    </a>
                                                    <div className="mt-1">
                                                        <form onSubmit={deleteAddressRequest}>
                                                            <input type="hidden" name="id" value={address._id}/>
                                                            <button type="submit" className="hover:cursor-pointer">
                                                                <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                                            </button>
                                                        </form>
                                                    </div>
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

export default AddressesTab;