import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment } from 'react';

var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

import { createAddress } from "../../../utils/backend/address";
import NotificationEmitter from "../../Notifications/NotificationEmitter";

import { DropdownSelect, PrimaryButton, TextField } from "../../UI";

import WidgetLayout from "../../Layouts/WidgetLayout";

import { useSession, getSession } from "next-auth/react"

const CreatePaymentOpt = () => {
    const { data: session, status } = useSession();

    const { emitNotification } = NotificationEmitter();

    const createAddressRequest = async (event) => {
        event.preventDefault();

        var data = JSON.stringify({
            street: event.target.street.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value,
            zip: event.target.zip.value,
            full_name: event.target.full_name.value,
            token: session.user.accessToken
        });

        var result = await createAddress(data);

        var result_msg;
        if(result) {
            if(result.errors) {
                result_msg = result.errors[0].msg;
            }
            else {
                result_msg = "Adicionada uma nova morada"
            }
        }

        emitNotification("success", result_msg);
    }

    return (
        <div>
            <WidgetLayout title="Adicionar um novo método de pagamento" description="Adicionar uma método á lista de métodos de pagamento do utilizador">
                <form onSubmit={createAddressRequest}>
                    <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                                Número do cartão
                            </label>
                            <TextField type="text" name="full_name" autoComplete="full_name"/>
                        </div>
                        
                        <div className="col-span-3">
                            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                                Data de validade
                            </label>
                            <TextField type="text" name="phone_number" autoComplete="phone_number"/>
                        </div>

                        <div className="col-span-3">
                            <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                CVC
                            </label>
                            <TextField type="text" name="street" autoComplete="street-address"/>
                        </div>

                        <div className="col-span-6">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                Nome
                            </label>
                            <TextField type="text" name="city" autoComplete="address-level2"/>
                        </div>

                        <div className="w-full col-span-6">
                            <div className="flex justify-end">
                                <div className="w-52">
                                    <PrimaryButton text="Adicionar" type="submit"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </WidgetLayout>
        </div>
    );
}

export default CreatePaymentOpt;