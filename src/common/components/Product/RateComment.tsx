import { Fragment, useState } from 'react'
import {
  XIcon,
} from '@heroicons/react/solid'
import { Listbox, Transition } from '@headlessui/react'

import { TextArea, PrimaryButton, StarRating} from '../UI/'

const RateComment = ({rate}) => {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
                <img
                className="inline-block h-10 w-10 rounded-full"
                src="http://localhost:8000/api/user/62850b5d676386ee80004849/picture"
                alt=""
                />
            </div>
            <div className="min-w-0 flex-1">
                <div className="border border-gray-300 bg-white rounded-lg shadow-sm overflow-hidden p-4 space-y-4">
                    <div className="">
                        <StarRating rating={rate.rate} rates={20} size={4}/>
                    </div>
                    <div className="text-gray-800">
                        { rate.message }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateComment;