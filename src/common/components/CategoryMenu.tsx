


import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Link from 'next/Link'
import Image from 'next/Image'

import { getCategories } from "../utils/backend/category";

const CategoryMenu = () => {
    const { data : categories, error : categoriesError} = getCategories();
    const filteredCategories = categories ? categories.filter((c) => { return c.parent == null }) : categories;

    return (
        <div>
            <div className="bg-lpi-gray-dark">
                <div className="text-center flex items-center mx-auto justify-center divide-x divide-lpi-gray">
                    {
                        filteredCategories ?
                            filteredCategories.map((category) => {
                                return (
                                    <div key={category._id} className="hover:bg-lpi-gray hover:cursor-pointer shadow w-32 text-sm">
                                        <div className="transition-transform duration-150 ease-out hover:scale-110">
                                            <Link href={`/category/${category._id}`}>
                                                <div className="p-2">
                                                    <div className="w-12 p-1 mx-auto">
                                                        <img
                                                            src={`http://localhost:8000/api/category/${category._id}/picture`}
                                                            alt={""}
                                                        />
                                                    </div>
                                                    <span className="text-gray-100">{`${category.name}`}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        :
                            [...Array(12)].map((x, i) => {
                                return (
                                    <div key={i} className="shadow-2xl w-32 text-sm animate-pulse">
                                        <div className="p-2 space-y-2">
                                            <div className="w-12 p-1 mx-auto opacity-40">
                                                <Image
                                                    src={`/icons/category_icon.png`}
                                                    alt={"cart"}
                                                    width={"100%"}
                                                    height={"100%"}
                                                    layout="responsive"
                                                />
                                            </div>
                                            <div className="w-2/3 mx-auto space-y-1">
                                                <div className="h-1 bg-gray-500 rounded"></div>
                                                <div className="h-1 bg-gray-500 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                    }
                </div>
            </div>
        </div>
    );
}

export default CategoryMenu;