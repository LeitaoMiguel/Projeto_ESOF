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

import CommentBox from './CommentBox';
import RateComment from './RateComment';

const RatingTab = ({productId, rates}) => {
    if(!productId)
        return (<></>);

    return (
        <div>
            <div className="mx-auto space-y-5">
                <div className="text-4xl text-gray-600 text-center">
                    Avaliações dos clientes
                </div>
                <div className="text-xl text-left text-gray-600">
                    Adicionar uma avaliação
                </div>
                <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-2">

                        <CommentBox productId={productId}/>
                    </div>
                    <div className="space-y-6">
                        {
                            rates.slice(0).reverse().map((rate) => {
                                return (
                                    <RateComment rate={rate}/>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RatingTab;