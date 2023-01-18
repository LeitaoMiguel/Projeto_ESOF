import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment } from 'react';

import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import PaymentOptsTab from "./PaymentOptsTab";
import CreatePaymentOpt from "./CreatePaymentOpt";

const BillingPage = () => {
    return (
        <div className="space-y-6">
            <PaymentOptsTab/>
            <CreatePaymentOpt/>
        </div>
    )
}

export default BillingPage;