import { apiURL } from "../config";

import { getSession } from 'next-auth/react'

export const getAboutMe = async (id) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/user/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result.about_me;
    }
    catch(error) {
        console.log(error);
    }
}

export const updateProfile = async (id, data) => {
    const session = await getSession()
    var token = "-";
    if(session)
        token = session.user.accessToken;

    try {
        const response = await fetch(`${apiURL}/user/${id}`, {
            method: 'PUT',
            body: data,
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        const result = await response.json();
        return result;
    }
    catch(error) {
        console.log(error);
    }
}