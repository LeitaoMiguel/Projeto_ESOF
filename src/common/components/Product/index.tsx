import React, { Fragment, useEffect, useContext, useState } from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Router from "next/router";
import Image from 'next/Image'
import Link from 'next/Link'

import {
    ArrowCircleLeftIcon, StarIcon
} from '@heroicons/react/outline'

import { TextLink, TextField, PrimaryButton, SecondaryButton, StarRating } from "../UI";

import NotificationEmitter from "../Notifications/NotificationEmitter";

import { getProduct } from "../../utils/backend/product";

import { addProductToCartUtil } from '../../utils/cart';

import { CartContext } from '../Cart/CartContextProvider';

import RatingTab from './RatingTab';

type ProductViewProps = {
    pid: string | string[];
}

const ProductView = (props: ProductViewProps) => {
    const { data : product, error : productError} = getProduct(props.pid);

    const { emitNotification } = NotificationEmitter();

    const {cartUpdate, setCartUpdate} = useContext(CartContext);

    const addProductToCartRequest = async (event) => {
        event.preventDefault()
        
        if(event.target.productId.value == 0)
            return;

        var data = {
            productId: event.target.productId.value,
            quantity: event.target.quantity.value
        };

        var result = await addProductToCartUtil(data);

        var result_msg = "";
        if(result) {
            if(result.errors) {
                result_msg = result.errors[0].msg;
                //setFormError(result_msg);
            }
            else {
                result_msg = "Adicionado um produto ao carrinho"
            }
        }

        emitNotification("success", result_msg);

        setCartUpdate(cartUpdate+1);
    }

    return (
        <div className="space-y-8 py-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-2 gap-10">
                    <div className="col-span-1">
                        <div className="flex mx-auto justify-center">
                            <div className="p-6 bg-white">
                                {
                                    product ?
                                        <img
                                            src={`http://localhost:8000/api/product/${product._id}/picture`}
                                            width="800"
                                            height="800"
                                            alt={"cart"}
                                        />
                                    :
                                    <></>
                                }
                            </div>
                        </div> 
                    </div>
                    <div className="col-span-1 flex-col w-full space-y-12">
                        <div className="">
                            {
                                product ?
                                    <div className=" space-y-2">
                                        <div className="text-3xl flex items-center">
                                            <div className="flex-1">
                                                { product.name }
                                            </div>
                                            <div>
                                                <div className="hover:cursor-pointer">
                                                    <Link href={`/category/${product.category._id}`}>
                                                        <ArrowCircleLeftIcon className="h-7 w-7 text-lpi-red hover:text-red-700"
                                                                aria-hidden="true"/>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            {
                                                product.discount > 0 ?
                                                    <div className="line-through decoration-lpi-red"> { product.price }€ </div>
                                                :
                                                <></>
                                            }
                                            <div className="flex font-semibold text-lpi-red items-center">
                                                <div className="text-2xl">
                                                    {
                                                        product.discount > 0 ?
                                                            (product.price - (product.price * (product.discount / 100))).toFixed(2)
                                                        :
                                                            (product.price).toFixed(2)
                                                    }
                                                </div>
                                                <div>
                                                    €
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <StarRating rating={ product.rate } size={4}/>
                                        </div>
                                        <div className="">
                                            { product.description }
                                        </div>
                                        
                                    </div>
                                :
                                    <span>
                                        Loading...
                                    </span>
                            }
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <form onSubmit={addProductToCartRequest}>
                                <input type="hidden" name="productId" value={ product ? product._id : 0 }/>
                                <input type="hidden" name="quantity" value={1}/>
                                <SecondaryButton type="submit" text="Adicionar ao carrinho"/>
                            </form>
                            <PrimaryButton type="button" text="Comprar agora"/> 
                        </div>
                    </div>
                </div>
            </div>
            {
                product ?
                    <RatingTab productId={product._id} rates={product.rates}/>
                        :
                    <></>
            }
            
        </div>
    );
}

export default ProductView;