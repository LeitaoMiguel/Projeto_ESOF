import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment } from 'react';

import WidgetLayout from "../../Layouts/WidgetLayout";
import { PrimaryButton, TextField } from "../../UI";

const PaymentMethodsTab = () => {
    return (
        <div>
            <WidgetLayout title="Atualizar palavra-passe" description="Esta aba permite que o utilizador atualize a sua palavra-passe">
            <form onSubmit={() => {}}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                Antiga palavra-passe
                            </label>
                            <TextField type="text" name="phone_number" autoComplete="phone_number"/>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Nova palavra-passe
                            </label>
                            <TextField type="text" name="full_name" autoComplete="full_name"/>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Repetir palavra-passe
                            </label>
                            <TextField type="text" name="full_name" autoComplete="full_name"/>
                        </div>

                        
                        
                        

                        <div className="w-full col-span-6">
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

export default PaymentMethodsTab;