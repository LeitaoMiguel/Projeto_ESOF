import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { ChevronDownIcon, TrashIcon} from '@heroicons/react/outline'

import ModalLayout from '../../Layouts/ModalLayout';
import NewCategoryForm from './NewCategoryForm';

import { getCategories, deleteCategory } from "../../../utils/backend/category";

const CategoriesPage = () => {
    const { data : categories, error : categoriesError} = getCategories();
    const [filteredCategories, setFilteredCategories] = useState<any[]>();

    const [newCategoryModalOpen, setNewCategoryModalOpen] = useState(false);

    const deleteCategoryRequest = async (event) => {
        event.preventDefault();

        var id = event.target.id.value;
        var result = await deleteCategory(id);
        
        var result_msg = "";
        if(result.errors) {
            result_msg = result.errors[0].msg;
            //setFormError(result_msg);
        }
        else {
            result_msg = "Removido um produto"
        }

        alert(result_msg)
    }

    useEffect(() => {
        setFilteredCategories(categories ? categories.filter(c => { return true }) : categories);
    }, [categories]);

    return (
        <div>
            <ModalLayout open={newCategoryModalOpen} setOpen={setNewCategoryModalOpen}>
                <NewCategoryForm setOpen={setNewCategoryModalOpen}/>
            </ModalLayout>
            
            <div className="space-y-4">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Categorias</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Lista de categorias na base de dados.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => {setNewCategoryModalOpen(true)}}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Adicionar categoria
                        </button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            <div className="group inline-flex hover:cursor-pointer" onClick={() => {}}>
                                                Nome
                                                <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <div className="group inline-flex hover:cursor-pointer" onClick={() => {}}>
                                                Descrição
                                                <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <div className="group inline-flex hover:cursor-pointer" onClick={() => {}}>
                                                Parente
                                                <span className="ml-2 flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                                                    <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            <div className="group inline-flex hover:cursor-pointer" onClick={() => {}}>
                                                Ações
                                            </div>
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {filteredCategories?.map((category, categoryIdx) => (
                                            <tr key={category._id} className={categoryIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{category.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{category.description}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    { category.parent ? category.parent.name : "--"}
                                                </td>
                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 flex space-x-4">
                                                    <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                                        Editar
                                                    </a>
                                                    
                                                    <form onSubmit={deleteCategoryRequest}>
                                                        <input type="hidden" name="id" value={category._id}/>
                                                        <button type="submit" className="hover:cursor-pointer">
                                                            <TrashIcon className="h-5 w-5" aria-hidden="true"/>
                                                        </button>
                                                    </form>
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
        </div>
    );
}

export default CategoriesPage;