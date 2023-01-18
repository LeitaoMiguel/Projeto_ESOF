

import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment, useEffect } from 'react';

import { DropdownSelect, PrimaryButton, SecondaryButton, TextField, TextArea, FileUpload } from "../../UI";

import WidgetLayout from "../../Layouts/WidgetLayout";

import { getAboutMe, updateProfile } from "../../../utils/backend/auth";

import { useSession, signIn, signOut } from "next-auth/react"
import { userInfo } from "os";

const ProfileTab = () => {
    const { data: session, status } = useSession()

    const [currentAboutMe, setCurrentAboutMe] = useState();

    const [uploadedPhoto, setUploadedPhoto] = useState();

    const updateProfileRequest = async (event) => {
        event.preventDefault();

        let formData = new FormData(event.target);
        formData.append('photo', uploadedPhoto);

        var result = await updateProfile(session.user.id, formData);
    
        var result_msg = "";
        if(result.errors) {
            result_msg = result.errors[0].msg;
            //setFormError(result_msg);
        }
        else {
            result_msg = "Perfil atualizado"
        }

        alert(result_msg);
    }

    const changeHandler = (e) => {
        setUploadedPhoto(e.target.files[0]);
	};

    useEffect(() => {
        const defaultAboutMe = async() => {
            var fetchedAboutMe = await getAboutMe(session.user.id);
            setCurrentAboutMe(fetchedAboutMe);
        }
        defaultAboutMe();
    }, [session]);

    return (
        <div>
            <WidgetLayout title="Perfil" description="Poderá atualizar o seu perfil nesta aba.">
                <form onSubmit={updateProfileRequest}>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Foto de perfil
                            </label>
                            <div className="mt-1 flex items-center space-x-4">
                                <span className="inline-block bg-gray-100 rounded-full overflow-hidden h-12 w-12">
                                    <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <div className="flex text-sm text-gray-600">
                                        {
                                            !uploadedPhoto ?
                                                <FileUpload uploadedPhoto={uploadedPhoto} setUploadedPhoto={setUploadedPhoto}/>
                                            :
                                                <></>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Sobre mim
                            </label>
                            <TextArea name="about_me" />
                            <p className="mt-2 text-sm text-gray-500">
                                Breve descrição sobre si.
                            </p>
                        </div>
                        <div className="col-span-3">
                            <div className="flex justify-end">
                                <div className="w-52">
                                    <PrimaryButton text="Atualizar" type="submit"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </WidgetLayout>
        </div>
    )
}

/*
<div className="w-full space-y-4">
    <ModalLayout open={newProductModalOpen} setOpen={setNewProductModalOpen}>
        <NewAddressForm setOpen={setNewProductModalOpen}/>
    </ModalLayout>
    <div className="text-2xl text-center text-gray-600">
        Area Cliente
    </div>
    <div className="max-w-xl mx-auto">
        <PrimaryButton onClick={() => {setNewProductModalOpen(true)}} type="button" text="Novo endereço"/>
    </div>
</div>
*/

export default ProfileTab;