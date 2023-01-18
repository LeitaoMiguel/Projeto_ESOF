import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

interface Props {
    rating?: number;
    rates?: number
    size?: number
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Star = ({place, rating, size = 3}) => {
    return (
        <svg className={classNames(`w-${size} h-${size} fill-current`, (Math.round(rating) >= place) ? "text-yellow-500" : "text-gray-400")} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
    );
}

const StarRating = (props: Props) => {
    return (
        <div className="flex space-x-1">
            <div className="flex items-center">
                <div className="flex items-center space-x-1">
                    <Star place={1} rating={props.rating} size={props.size}/>
                    <Star place={2} rating={props.rating} size={props.size}/>
                    <Star place={3} rating={props.rating} size={props.size}/>
                    <Star place={4} rating={props.rating} size={props.size}/>
                    <Star place={5} rating={props.rating} size={props.size}/>
                </div>
            </div>
            <div className="text-xs text-gray-500">{ `${props.rating ? props.rating : 0}`}</div>
        </div>
    );
}

export default StarRating;