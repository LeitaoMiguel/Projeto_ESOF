import React, {Fragment, useEffect, useContext, useState} from 'react';
import { Dialog, Transition } from "@headlessui/react";

import Image from 'next/Image'
import Link from 'next/Link'

import { TextLink, TextField, PrimaryButton } from "../UI/";

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

const RegisterForm = () => {
    const [formError, setFormError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const registerUser = async event => {
        event.preventDefault()

        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                body: JSON.stringify({
                  name: event.target.name.value,
                  surname: event.target.surname.value,
                  email: event.target.email.value,
                  password: event.target.password.value,
                  confirmPassword: event.target.confirmPassword.value
                }),
                headers: {
                  'Content-Type': 'application/json'
                },
                method: 'POST'
            })

            const data = await response.json();

            setEmailError("");
            setPasswordError("");

            data.errors.forEach((error) => {
                if(error.param === "email")
                    setEmailError(error.msg);
                else if(error.param === "password" || error.param === "confirmPassword")
                    setPasswordError(error.msg);
                else
                setEmailError(error.msg);
            });
        }
        catch(error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            <div className="flex-col">
                <form onSubmit={registerUser}>
                    <div className="space-y-6">
                        {/* TITLE */}
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900">Criar utilizador</h1>

                            <div className="flex space-x-1 text-sm">
                                <span className="text-gray-700">Já tem uma conta?</span> <TextLink text="Faça login." link="/login"/>
                            </div>
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

                        {/* DIVIDER */}
                        <div className="text-center">
                            <span>Ou</span>
                        </div>


                        {/* EMAIL REGISTER */}
                        <div className="space-y-4">
                            <div className="text-lg text-gray-900">
                                Inscrever-se com email
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                    Endereço de email
                                </div>
                                <TextField name="email" type="text" autoComplete="email"/>
                                <div className="text-xs font-black text-red-500">
                                    {emailError}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="col-span-1">
                                        <div className="text-sm text-gray-700">
                                            Nome
                                        </div>
                                        <TextField name="name" type="text" autoComplete="name"/>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-sm text-gray-700">
                                            Sobrenome
                                        </div>
                                        <TextField name="surname" type="text" autoComplete="surname"/>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                    Senha
                                </div>
                                <TextField name="password" type="password"/>
                                <div className="text-xs font-black text-red-500">
                                    {passwordError}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-sm text-gray-700">
                                    Repetir senha
                                </div>
                                <TextField name="confirmPassword" id="c"type="password"/>
                            </div>

                            <div className="text-gray-700 text-sm">
                                <span>Ao clicar em Criar conta, eu concordo que li e aceito os </span>
                                <TextLink text="Termos de uso" link="/terms-of-service"/>
                                <span> e a </span>
                                <TextLink text="Política de privacidade" link="/privacy-policy"/>
                                <span>.</span>
                            </div>

                            <div className="col-span-3">
                                <div className="flex items-center space-x-4">
                                    <div>
                                    <PrimaryButton text="Criar conta" type="submit"/>
                                    </div>
                                    <TextLink text="Voltar" link="/login"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm/>
        </div>
    );
}

export default RegisterPage;