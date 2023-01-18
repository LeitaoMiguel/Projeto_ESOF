import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

const Footer = () => {
    return (
        <div>
            <div className="bg-lpi-gray py-6 text-center">
                <span className="text-gray-100">
                    @ 2021 Todos os direitos reservados
                </span>
            </div>
        </div>
    );
}

export default Footer;