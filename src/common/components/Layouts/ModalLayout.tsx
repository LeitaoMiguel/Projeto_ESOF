import React, { ReactNode, Fragment, useRef, useEffect, useContext, useState} from 'react';

import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/outline'

type Props = {
    children: ReactNode;
    open: boolean;
    setOpen: (value: boolean) => void;
}

const ModalLayout = ({children, open, setOpen} : Props) => {
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
                <div className="flex items-center justify-center min-h-screen text-center sm:block">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-bottom bg-white rounded-lg p-6 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full">
                            {children }
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalLayout;