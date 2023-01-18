import {Dialog, Transition} from "@headlessui/react";
import React, { ReactNode, useState, Fragment } from 'react';

import { CreditCardIcon, KeyIcon, UserCircleIcon, UserGroupIcon, ViewGridAddIcon } from '@heroicons/react/outline'
import UpdatePasswordTab from "./UpdatePasswordTab";

const PasswordsPage = () => {
    return (
        <div className="space-y-6">
            <UpdatePasswordTab/>
        </div>
    )
}

export default PasswordsPage;