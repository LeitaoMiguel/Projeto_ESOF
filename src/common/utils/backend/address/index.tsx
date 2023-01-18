import useSWR, { mutate, useSWRConfig } from 'swr'

import { apiURL } from "../config";

import { useSession, getSession } from "next-auth/react"

export const getAddress = (id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(`${apiURL}/address/${id}`, fetcher);
}

export const getAddresses = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(`${apiURL}/address/`, fetcher);
}

export const createAddress = async (data) => {
    try {
        const response = await fetch(`${apiURL}/address/`, {
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        const result = await response.json();
        mutate(`${apiURL}/address/`);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const deleteAddress = async (id) => {
    try {
        const response = await fetch(`${apiURL}/address/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json();
        mutate(`${apiURL}/address/`);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}