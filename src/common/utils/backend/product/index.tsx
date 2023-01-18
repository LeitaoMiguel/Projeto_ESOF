import useSWR, { mutate } from 'swr'

import { apiURL } from "../config";

import { getSession } from 'next-auth/react'

export const getProduct = (id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json() );
    return useSWR(id ? `${apiURL}/product/${id}` : null, fetcher);
}

export const getProducts = (query?) => {
    var fetch_url = `${apiURL}/product`

    if(query) {
        query.forEach((q) => {
            if(q.value) {
                fetch_url = fetch_url.concat("?" + q.key + "=" + q.value);
            }
        })
    }
    
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(fetch_url, fetcher);
}

export const createProduct = async (data) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/product/`, {
            body: data,
            headers: {
                authorization: `Bearer ${token}`
            },
            method: 'POST'
        })
        const result = await response.json();
        mutate(`${apiURL}/product`);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/product/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        })
        const result = await response.json();
        mutate(`${apiURL}/product`);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const addRating = async (data, productId) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    console.log(data);

    try {
        const response = await fetch(`${apiURL}/product/${productId}/rate`, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            method: 'POST'
        })
        const result = await response.json();
        mutate(`${apiURL}/product/${productId}`);
        return result;
    }
    catch(error) {
        console.log(error);
    }
}