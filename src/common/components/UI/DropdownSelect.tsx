/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

interface Props {
    id?: string;
    name: string;
    data: any[];
}

const DropdownSelect = (props:Props) => {
    return (
        <div>
            <select name={props.name} id={props.id}
                className="block w-full p-2 border-gray-300 focus:outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
            >
                <option value={""}>-</option>
                {
                    props.data ?
                        props.data.map((entry) => {
                            return (
                                <option value={entry._id}>{entry.name}</option>
                            );
                        })
                    :
                        <></>
                }
            </select>
        </div>
    )
}

export default DropdownSelect;