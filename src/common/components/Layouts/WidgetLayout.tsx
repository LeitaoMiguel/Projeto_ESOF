



import React, { ReactNode, Fragment, useEffect, useContext, useState} from 'react';

type Props = {
    children: ReactNode;
    title?: String;
    description?: String;
}

const WidgetLayout = ({ children, title = "", description = ""}: Props) => {
    return (
        <div>
            <div className="">
                <div className="bg-gray-100 p-6 rounded-t-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                </div>
                <div className="bg-white p-6 rounded-b-xl shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default WidgetLayout;

/*
    <div className="shadow sm:rounded-md sm:overflow-hidden p-4">
        <div className="bg-gray-100">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>

        <div className="bg-white">
            <div className="ml-4 pt-4">
                {children}
            </div>
        </div>
    </div>
*/