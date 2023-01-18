


import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { getCategories } from "../../utils/backend/category";

import { PrimaryButton } from "../UI";

import AddressesTab from './AddressesTab';
import CreateAddressesTab from '../ClientArea/Addresses/CreateAddressTab';
import NotificationEmitter from '../Notifications/NotificationEmitter';
import { useSession } from 'next-auth/react';
import { CartContext } from '../Cart/CartContextProvider';
import { getUserCartUtil } from '../../utils/cart';
import BillingTab from './BillingTab';
import CreatePaymentOpt from '../ClientArea/Billing/CreatePaymentOpt';

const CheckoutPage = () => {
    const [selectedAddress, setSelectedAddress] = useState();
    const [selectedPaymentOpt, setSelectedPaymentOpt] = useState();

    const { data: session, status } = useSession()
    const [cart, setCart] = useState<any[]>();
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceWithDiscount, setTotalPriceWithDiscount] = useState(0);

    const {cartUpdate, setCartUpdate} = useContext(CartContext);

    const { emitNotification } = NotificationEmitter();

    const submitCheckout = (event) => {
        if(!selectedAddress)
            alert("Tem de selecionar uma morada!")

        var data = JSON.stringify({
            address: selectedAddress,
        });
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
            <div className="text-4xl text-gray-800">
                Finalizar encomenda
            </div>
            <div className="grid grid-cols-6 gap-4 w-full">
                <div className="col-span-4 rounded-lg">
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="text-3xl text-gray-700">
                                Morada de entrega
                            </div>
                            <AddressesTab selectedOption={selectedAddress} setSelectedOption={setSelectedAddress}/>
                            <CreateAddressesTab/>
                        </div>
                        <div className="space-y-4">
                            <div className="text-3xl text-gray-700">
                                Método de pagamento
                            </div>
                            <BillingTab selectedPaymentOpt={selectedPaymentOpt} setSelectedPaymentOpt={setSelectedPaymentOpt}/>
                            <CreatePaymentOpt/>
                        </div>
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
                            <PrimaryButton type="button" onClick={submitCheckout} text="Finalizar encomenda" disabled={selectedAddress && selectedPaymentOpt ? false : true}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;