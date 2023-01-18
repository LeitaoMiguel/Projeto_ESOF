import useSWR from 'swr'
import { apiURL } from '../config'

import { getSession } from 'next-auth/react'

export const getCategory = (id) => {
    const fetcher = (url) => fetch(url).then((res) => res.json());
    return useSWR(id ? `${apiURL}/category/${id}` : null, fetcher);
}

export const getCategories = (query?) => {
    var fetch_url = `${apiURL}/category`

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


export const createCategory = async (data) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/category/`, {
            body: data,
            headers: {
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

export const deleteCategory = async (id) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/category/${id}`, {
            headers: {
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