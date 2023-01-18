


import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { getUserCart } from "../../utils/backend/user";

import { getUserCartUtil, removeEntryFromCartUtil, updateEntryOnCartUtil } from '../../utils/cart';

import { CheckIcon, XIcon } from '@heroicons/react/outline'

import { PrimaryButton } from "../UI";

import { useSession } from "next-auth/react"

import { CartContext } from '../Cart/CartContextProvider';

import NotificationEmitter from "../Notifications/NotificationEmitter";

const CartPage = () => {
    const { data: session, status } = useSession()
    const [cart, setCart] = useState<any[]>();
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);

    const {cartUpdate, setCartUpdate} = useContext(CartContext);

    const { emitNotification } = NotificationEmitter();

    const removeEntryFromCartRequest = async (id) => {
        removeEntryFromCartUtil(id);

        setCartUpdate(cartUpdate+1);
        emitNotification("success", "Produto removido do carrinho");
    }

    useEffect(() => {
        if(cart) {
            var _totalPrice = 0;
            var _totalPriceWithDiscount = 0;

            cart.forEach((e) => {
                _totalPrice += parseFloat(e.product.price) * parseFloat(e.quantity);
                _totalPriceWithDiscount += (parseFloat(e.product.price) - (parseFloat(e.product.price) * (parseFloat(e.product.discount) / 100))) * parseFloat(e.quantity);
            });

            setTotalPrice(_totalPrice);
            setTotalPriceWithDiscount(_totalPriceWithDiscount);
        }
    })

    useEffect(() => {
        const getCart = async () => {
            var newcart = await getUserCartUtil()
            setCart(newcart);
        };
        getCart();
    }, [cartUpdate])

    return (
        <div className="space-y-4 py-6">
            <div className="text-3xl">
                Carrinho de compras
            </div>
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 rounded-lg">
                    <div className="">
                        {
                            cart ?
                                cart.length != 0 ?
                                    cart.map((e) => {
                                        return (
                                            <div key={e._id} className="shadow-lg border w-full text-sm p-6 bg-white">
                                                <div className="flex gap-6">
                                                    <div className="col-span-1">
                                                        <div className="w-32 p-1">
                                                            <img
                                                                src={`http://localhost:8000/api/product/${e.product._id}/picture`}
                                                                alt={"cart"}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full relative space-y-2">

                                                        <div className="flex items-center">
                                                            <div className="text-black text-lg flex-1">
                                                                {`${e.product.name}`}
                                                            </div>
                                                            <div className="text-gray-300 hover:text-gray-400 hover:cursor-pointer"
                                                                onClick={() => { removeEntryFromCartRequest(e.product._id) }}>
                                                                <XIcon className="h-6 w-6 "
                                                                    aria-hidden="true"/>
                                                            </div>
                                                        </div>

                                                        <div className="flex space-x-2 items-center">
                                                            {
                                                                e.product.discount > 0 ?
                                                                    <div className="text-sm line-through decoration-lpi-red"> { e.product.price }€ </div>
                                                                :
                                                                <></>
                                                            }
                                                            <div className="flex font-semibold text-black items-center">
                                                                <div className="">
                                                                    {
                                                                        e.product.discount > 0 ?
                                                                            (e.product.price - (e.product.price * (e.product.discount / 100))).toFixed(2)
                                                                        :
                                                                            (e.product.price)
                                                                    }
                                                                </div>
                                                                <div>
                                                                    €
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="absolute inset-x-0 bottom-0 flex space-x-1 items-center">
                                                            <CheckIcon className="h-4 w-4 text-green-500"
                                                                    aria-hidden="true"/>
                                                            <div className="text-sm text-green-500"> Em stock </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                })
                                :
                                    <></>
                            :
                                <></>
                        }
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="bg-white p-6 space-y-4 w-full shadow-lg">
                        <h1 className="text-xl text-gray-900">Resumo da encomenda</h1>
                        <div className="divide-y">
                            <div className="flex justify-between py-4">
                                <p className="text-sm text-gray-500">
                                    Portes estimados
                                </p>
                                <p className="text-sm text-gray-700 font-bold">
                                    12$
                                </p>
                            </div>
                            <div className="flex justify-between py-4">
                                <p className="text-sm text-gray-500">
                                    Total
                                </p>
                                <p className="text-sm text-gray-700 font-bold">
                                    {totalPrice.toFixed(2)}€
                                </p>
                            </div>
                            <div className="flex justify-between py-4">
                                <p className="text-gray-500">
                                    Total com desconto
                                </p>
                                <p className="text-gray-700 font-bold">
                                    {totalPriceWithDiscount.toFixed(2)}€
                                </p>
                            </div>
                        </div>
                        <Link href="/checkout">
                            <PrimaryButton type="button" text="Finalizar encomenda"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;