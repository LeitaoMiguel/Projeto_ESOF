import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Image from 'next/Image'
import Link from 'next/Link'

import { TextLink, TextField, PrimaryButton } from "../UI/";

import { signIn, getSession } from "next-auth/react";

interface SocialButtonProps {
    social: string;
}

const SocialButton = (props:SocialButtonProps) => {
    var social = props.social
    var alt = social[0].toUpperCase() + social.substring(1)

    return (
        <div className="w-12">
            <a href="#">
                <img
                    src={`/icons/${social}.png`}
                    alt={alt}
                />
            </a>
        </div>
    );
}

const LoginForm = () => {
    const loginUser = async event => {
        event.preventDefault()
        const response = await signIn("credentials", { redirect: false, email: event.target.email.value, password: event.target.password.value });

        if(response.error) {
            console.log(response.error)
        }
        else {
            window.location= "/" as (string | Location) & Location;
        }
    }
    
    return (
        <div>
            <div className="flex-col antialiased">
                <form onSubmit={loginUser}>
                    <div className="space-y-6">

                        {/* TITLE */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Entrar</h1>

                            <div className="flex space-x-1 text-sm">
                                <span className="text-gray-700">Ainda não tem uma conta?</span> <TextLink text="Crie uma." link="/register"/>
                            </div>
                        </div>

                        {/* EMAIL REGISTER */}
                        <div className="space-y-4">
                            <div className="text-lg text-gray-900">
                                Entrar com o email
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                    Endereço de email
                                </div>
                                <TextField name="email" type="text" autoComplete="email"/>
                                <div className="text-xs font-black text-red-500">
                                    {/*emailError*/}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                    Senha
                                </div>
                                <TextField name="password" type="password"/>
                                <div className="text-xs font-black text-red-500">
                                    {/*passwordError*/}
                                </div>
                            </div>

                            <div className="col-span-3">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <PrimaryButton text="Login" type="submit"/>
                                    </div>
                                    <TextLink text="Voltar" link="/"/>
                                </div>
                            </div>
                        </div>

                        {/* DIVIDER */}
                        <div className="text-center">
                            <span>Ou</span>
                        </div>

                        {/* SOCIAL REGISTER */}
                        <div className="space-y-2">
                            <div className="text-lg text-gray-900">
                                Entre com as redes sociais
                            </div>

                            <div className="flex space-x-4">
                                <SocialButton social="facebook"/>
                                <SocialButton social="google"/>
                                <SocialButton social="apple"/>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const LoginPage = () => {
    return (
        <div className="">
            <LoginForm/>
        </div>
    );
}

export default LoginPage;