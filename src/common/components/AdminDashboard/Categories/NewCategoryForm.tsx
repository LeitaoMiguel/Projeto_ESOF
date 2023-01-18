/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useRef, useEffect } from 'react'

import Image from 'next/image'

import { CheckIcon } from '@heroicons/react/outline'

import { PrimaryButton, SecondaryButton, TextField, TextArea, DropdownSelect, FileUpload } from "../../UI";

import { getCategories, createCategory } from "../../../utils/backend/category";

type Props = {
    setOpen?: Function;
}

const NewCategoryForm = (props:Props) => {
    const { data : categories, error : categoriesError} = getCategories();

    const [uploadedPhoto, setUploadedPhoto] = useState();

    const createCategoryRequest = async (event) => {
        event.preventDefault()

        let formData = new FormData(event.target);
        formData.append('photo', uploadedPhoto);

        var result = await createCategory(formData);

        var result_msg = "";
        if(result) {
            if(result.errors) {
                result_msg = result.errors[0].msg;
                //setFormError(result_msg);
            }
            else {
                result_msg = "Criada uma categoria"
            }
        }
        
        alert(result_msg);

        props.setOpen(false);
    }

    return (
        <div>
            <form onSubmit={createCategoryRequest}>
                <div className="divide-y">
                    <div className="pb-3">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Adicionar uma nova categoria</h3>
                        <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                    </div>
                    
                    <div className="py-3">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Nome
                                </label>
                                <div className="mt-1">
                                    <TextField name="name" type="text"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Descrição
                                </label>
                                <div className="mt-1">
                                    <TextArea name="description"/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Fotografia
                                </label>
                                <div className="mt-1">
                                    <FileUpload uploadedPhoto={uploadedPhoto} setUploadedPhoto={setUploadedPhoto}/>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Categoria parente
                                </label>
                                <div className="mt-1">
                                    <DropdownSelect name="parent" data={categories}/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-3">
                        <div className="flex space-x-2">
                            <SecondaryButton type="button" text="Cancelar" onClick={() => props.setOpen(false)}/>
                            <PrimaryButton type="submit" text="Adicionar categoria"/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default NewCategoryForm;