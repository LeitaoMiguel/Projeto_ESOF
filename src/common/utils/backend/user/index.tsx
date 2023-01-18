import useSWR from 'swr'

import { apiURL } from "../config";

import { getSession } from 'next-auth/react'

export const getUser = (session) => {
    const fetcher = (url, token) => fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        },
    }).then((res) => res.json());

    return useSWR(
        session ? [`${apiURL}/user/${session.user.id}`, session.user.accessToken] : null, 
        fetcher
    )
}

export const getUsers = (query?) => {
    var fetch_url = `${apiURL}/user`

    if(query) {
        query.forEach((q) => {
            fetch_url = fetch_url.concat("?" + q.key + "=" + q.value);
        })
    }
    
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(fetch_url, fetcher);
}

// USER CART OPERATIONS
export const getUserCart = (session) => {
    const fetcher = (url, token) => fetch(url, {
        method: 'GET',
        headers: {
            authorization: `Bearer ${token}`
        },
    }).then((res) => res.json());

    return useSWR(
        session ? [`http://localhost:8000/api/user/${session.user.id}/cart`, session.user.accessToken] : null, 
        fetcher
    )
}

export const addProductToCart = async (data) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/user/${session.user.id}/cart/`, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
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

export const removeEntryFromCart = async (id) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;
    try {
        const response = await fetch(`${apiURL}/user/${session.user.id}/cart/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            method: 'DELETE'
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}

export const updateEntryOnCart = async (productId, data) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/user/${session.user.id}/cart/${productId}`, {
            body: data,
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
            },
            method: 'PUT'
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}