import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { ChevronDownIcon, TrashIcon} from '@heroicons/react/outline'

import ModalLayout from '../../Layouts/ModalLayout';
import NewProductForm from './NewProductForm';

import { getProducts, deleteProduct } from "../../../utils/backend/product";
import NotificationEmitter from '../../Notifications/NotificationEmitter';

const ProductsPage = () => {
    const { data : products, error : productsError} = getProducts();

    const [newProductModalOpen, setNewProductModalOpen] = useState(false);

    const [productsImage, setProductsImage] = useState("");

    const { emitNotification } = NotificationEmitter();

    const deleteProductRequest = async (event) => {
        event.preventDefault();

        var id = event.target.id.value;
        await deleteProduct(id);
        
        emitNotification("success", "Produto removido");
    }

    return (
        <div>
            <ModalLayout open={newProductModalOpen} setOpen={setNewProductModalOpen}>
                <NewProductForm setOpen={setNewProductModalOpen}/>
            </ModalLayout>

            <div className="space-y-4">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-xl font-semibold text-gray-900">Produtos</h1>
                        <p className="mt-2 text-sm text-gray-700">
                            Lista de produtos na base de dados.
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                        <button
                            onClick={() => {setNewProductModalOpen(true)}}
                            type="button"
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                        >
                            Adicionar produto
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
                                                
                                            </th>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Nome
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Descrição
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Categoria
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Preço
                                            </th>
                                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Editar</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {products?.slice(0).reverse().map((product, productIdx) => (
                                            <tr key={product._id} className={productIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                    <div className="flex items-center">
                                                        <div className="h-14 w-14 flex-shrink-0">
                                                            <img className="h-14 w-14" src={`http://localhost:8000/api/product/${product._id}/picture`} alt="" />
                                                        </div>
                                                    </div>
                                                </td>
                                                
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-900">{product.name}</div>
                                                </td>
                                                
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-900">{product.description}</div>
                                                </td>

                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                    <div className="text-gray-900">{product.category.name}</div>
                                                </td>

                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}€</td>

                                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                    <form onSubmit={deleteProductRequest}>
                                                        <input type="hidden" name="id" value={product._id}/>
                                                        <button type="submit" className="text-indigo-600 hover:text-indigo-900">
                                                            Remover
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

export default ProductsPage;