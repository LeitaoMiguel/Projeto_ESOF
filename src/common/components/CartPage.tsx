


import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { getCategories } from "../utils/backend/category";

const products = [
    {
        _id: 1,
        name: "Corsair Vengeance RGB PRO Black - Módulo de memória DDR4-RAM 3600 MHz 2 x 8 GB (3600 MHz)Corsair Vengeance RGB PRO Black - Módulo de memória DDR4-RAM 3600 MHz 2 x 8 GB (3600 MHz)"
    },
    {
        _id: 2,
        name: "Lidade"
    }
]

const CartPage = () => {
    return (
        <div className="flex max-w-7xl mx-auto">
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 bg-white rounded-lg p-8 space-y-4">
                    <div className="text-3xl">
                        Carrinho de compras
                    </div>
                    <div className="">
                        {
                            products ?
                                products.map((product) => {
                                    return (
                                        <div key={product._id} className="shadow-lg border w-full text-sm p-3">
                                            <div className="grid grid-cols-5 gap-4">
                                                <div className="col-span-1">
                                                    <div className="w-full p-1">
                                                        <Image
                                                            src={`/images/alicate.jpg`}
                                                            alt={"cart"}
                                                            width={"100%"}
                                                            height={"100%"}
                                                            layout="responsive"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-span-4 space-y-2">
                                                    <div className="text-black text-sm">{`${product.name}`}</div>

                                                    <div className="text-black text-lg">{`€82,24 (99,51 € IVA incluído)`}</div>

                                                    <div className="text-sm text-green-500"> Em stock </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            :
                            <></>
                        }
                    </div>
                    <div className="text-xl text-right">
                        Subtotal (7 produtos): €857,63
                    </div>
                </div>
                <div className="col-span-2 bg-white p-8">
                    ss
                </div>
            </div>

            
        </div>
    );
}

export default CartPage;