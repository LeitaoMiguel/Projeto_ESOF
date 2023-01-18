

import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

const people = [
    {
      name: 'Francisco Giestas',
      title: 'Front-end Developer',
      department: 'Development',
      email: 'giestas3@gmail.com',
      role: 'Admin',
      image: 'https://pps.whatsapp.net/v/t61.24694-24/264229404_704845160924179_7972194203713721938_n.jpg?ccb=11-4&oh=6044da51b4c999cfaab40de97d0c0f8e&oe=629A4309'
    },
    // More people...
]

const EmployeesPage = () => {
    /*
    const { data : products, error : productsError} = getProducts();
    const filteredproducts = products ? products.filter(c => { return true }) : products;
    */

    return (
        <div className="">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Funcionários</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Lista e informações dos funcionários da empresa.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Adicionar funcionário
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Titulo
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Status
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Cargo
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Editar</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {people.map((person) => (
                                        <tr key={person.email}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="font-medium text-gray-900">{person.name}</div>
                                                        <div className="text-gray-500">{person.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{person.title}</div>
                                                <div className="text-gray-500">{person.department}</div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {person.name}</span>
                                                </a>
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

export default EmployeesPage;