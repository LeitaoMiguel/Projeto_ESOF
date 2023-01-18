import useSWR from 'swr'
import { apiURL } from '../config'

export const getOrder = (id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(`${apiURL}/order/${id}`, fetcher);
}

export const getOrders = () => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(`${apiURL}/order/`, fetcher);
}

export const createOrder = async (data) => {
    try {
        const response = await fetch(`${apiURL}/order/`, {
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const updateOrder = async (data) => {
    try {
        const response = await fetch(`${apiURL}/order/`, {
            body: data,
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${apiURL}/order/${id}`, {
            method: 'DELETE'
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}