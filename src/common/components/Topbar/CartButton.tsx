import { Fragment, useState, useContext, useEffect, useRef } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, XIcon, TrashIcon } from '@heroicons/react/solid'

import Router from "next/router";

import Link from 'next/Link'

import { SecondaryButton, PrimaryButton } from '../UI/'

import NotificationEmitter from "../Notifications/NotificationEmitter";

import { getUserCartUtil, removeEntryFromCartUtil, updateEntryOnCartUtil } from '../../utils/cart';

import { CartContext } from '../Cart/CartContextProvider';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const CartButton = () => {
    const {cartUpdate, setCartUpdate} = useContext(CartContext);

    const [cart, setCart] = useState<any[]>();

    const form = useRef(null)

    const { emitNotification } = NotificationEmitter();
    
    const updateEntryOnCartRequest = async (event) => {
        event.preventDefault()

        var data = {
            productId: event.target.productId.value,
            quantity: event.target.quantity.value
        };

        await updateEntryOnCartUtil(data);
        
        setCartUpdate(cartUpdate+1);
        emitNotification("success", "Produto atualizado no carrinho");
    }

    const removeEntryFromCartRequest = async (id) => {
        removeEntryFromCartUtil(id);

        setCartUpdate(cartUpdate+1);
        emitNotification("success", "Produto removido do carrinho");
    }

    useEffect(() => {
        const getCart = async () => {
            var newcart = await getUserCartUtil()
            setCart(newcart);
        };
        getCart();
    }, [cartUpdate])

    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <div className="relative inline-block">
                        <Popover.Button>
                            <div className="rounded-full transition-transform duration-150 ease-out hover:scale-110">
                                <div className={classNames(open ? 'bg-lpi-gray-dark' : '', 'p-1 hover:bg-lpi-gray-dark rounded-full hover:cursor-pointer')}>
                                    <div className="w-10">
                                        <img
                                            src={`/icons/cart.png`}
                                            alt={"cart"}
                                        />
                                    </div> 
                                </div>
                            </div>
                        </Popover.Button>
                        {
                            cart ?
                                cart.length != 0 ?
                                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">{cart.length}</span>
                                :
                                    <></>
                            :
                                <></>
                        }
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="absolute z-20 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-md sm:px-0">
                            <div>
                                <div className="rounded-t-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="p-4">
                                        <div className="flex">
                                            <div className="flex-1">
                                                <h3 className="text-lg leading-6 font-medium text-gray-900">Carrinho</h3>
                                                <p className="text-sm text-gray-500">Vista geral do carrinho</p>
                                            </div>

                                            <Popover.Button>

                                                <div className="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                                    <span className="sr-only">Close</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </div>
                                            </Popover.Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="text-sm text-left divide-y">
                                        {
                                            cart ?
                                                cart.length != 0 ?
                                                    cart.map((e) => {
                                                        return (
                                                            <div key={e._id} className="flex py-4 px-4 text-black items-center">
                                                                <Popover.Button className="flex-1">
                                                                    <Link href={`/product/${e.product._id}`}>
                                                                        <div className="flex items-center space-x-2 hover:cursor-pointer">
                                                                            <div className="w-10">
                                                                                <img
                                                                                    src={`http://localhost:8000/api/product/${e.product._id}/picture`}
                                                                                    alt={ e.product.name }
                                                                                />
                                                                            </div>
                                                                            <span> { e.product.name } </span>
                                                                        </div>
                                                                    </Link>
                                                                </Popover.Button>
                                                                
                                                                <div className="space-x-4 items-center flex">
                                                                    <div className="flex items-center divide-x">
                                                                        <form onSubmit={updateEntryOnCartRequest}>
                                                                            <input type="hidden" name="productId" value={e.product._id}/>
                                                                            <input type="hidden" name="quantity" value={parseInt(e.quantity)-1}/>
                                                                            <button type="submit" className="text-gray-500 shadow rounded-l-full bg-gray-100 py-1 px-2 ring-1 ring-black ring-opacity-10 hover:bg-gray-200 hover:cursor-pointer">
                                                                                -
                                                                            </button>
                                                                        </form>

                                                                        <form onSubmit={updateEntryOnCartRequest} ref={form}>
                                                                            <div className="shadow ring-1 ring-black ring-opacity-10">
                                                                                <input type="hidden" name="productId" value={e.product._id}/>
                                                                                <input name="quantity" type="text" min="0" max="10000" step="1" value={ e.quantity } onChange={ () => { form.current.requestSubmit() } }
                                                                                    className="shadow-sm block w-8 sm:text-sm rounded-md p-1 text-center"/>
                                                                            </div>
                                                                        </form>

                                                                        <form onSubmit={updateEntryOnCartRequest}>
                                                                            <input type="hidden" name="productId" value={e.product._id}/>
                                                                            <input type="hidden" name="quantity" value={parseInt(e.quantity)+1}/>
                                                                            <button type="submit" className="text-gray-500 shadow rounded-r-full bg-gray-100 py-1 px-2 ring-1 ring-black ring-opacity-10 hover:bg-gray-200 hover:cursor-pointer">
                                                                                +
                                                                            </button>
                                                                        </form>
                                                                    </div>

                                                                    <button onClick={() => { removeEntryFromCartRequest(e.product._id) }}>
                                                                        <TrashIcon className="h-5 w-5 text-red-600 hover:text-red-800"
                                                                            aria-hidden="true"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                :
                                                    <div className="py-4 px-4 text-center text-gray-500 ">
                                                        Não há produtos no carrinho
                                                    </div>
                                            :
                                                <div className="py-4 px-4 text-center text-gray-500 ">
                                                    Não há produtos no carrinhos
                                                </div>
                                        }
                                    </div>
                                </div>

                                <div className="rounded-b-lg bg-gray-100 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                    <div className="p-4">
                                        <div className="grid grid-cols-6 gap-2">
                                            <div className="col-span-6 sm:col-span-3">
                                                <Link href="/cart">
                                                    <div className="navbar-brand">
                                                        <SecondaryButton type="button" text="Ver carrinho"/>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <Link href="/checkout">
                                                    <div className="navbar-brand">
                                                        <PrimaryButton type="button" text="Checkout"/>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    )
}

export default CartButton;