

import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";
import Link from 'next/Link'

interface Props {
    id?: string;
    uploadedPhoto: File | undefined
    setUploadedPhoto: Function;
}

const FileUpload = (props: Props) => {

    const [file, setFile] = useState();

    const changeHandler = (e) => {
        setFile(e.target.files[0]);
        props.setUploadedPhoto(e.target.files[0]);
	};

    return (
        <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    {file ? (
                        <div className="text-black">
                            {
                                /*
                                
                                    <p>Filename: {props.uploadedPhoto.name}</p>
                                    <p>Filetype: {props.uploadedPhoto.type}</p>
                                    <p>Size in bytes: {props.uploadedPhoto.size}</p>
                                    <p>
                                        lastModifiedDate:{' '}
                                        {file.lastModifiedDate.toLocaleDateString()}
                                    </p>

                                */
                            }
                            
                            
                        </div>
                    ) : (
                        <div>
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                            >
                                <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="photo"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Carregue uma imagem</span>
                                    <input id="photo" name="photo" type="file" className="sr-only" onChange={changeHandler}/>
                                </label>
                                <p className="pl-1">ou arraste nesta zona</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF até 10MB</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileUpload;