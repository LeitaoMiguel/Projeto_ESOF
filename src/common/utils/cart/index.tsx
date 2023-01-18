import { getSession } from 'next-auth/react';

import { addProductToCart, removeEntryFromCart, updateEntryOnCart } from '../backend/user';
import { addProductToCartLocal, removeEntryFromCartLocal, updateEntryOnCartLocal, deleteCartLocal } from './localCart';

export const addProductToCartUtil = async (newProduct) => {
    addProductToCartLocal(newProduct);

    const session = await getSession()
    if(session)
        return await addProductToCart(JSON.stringify(newProduct));
}

export const removeEntryFromCartUtil = async (productId) => {
    removeEntryFromCartLocal(productId);

    const session = await getSession()
    if(session)
        return await removeEntryFromCart(productId);
}

export const updateEntryOnCartUtil = async(data) => {
    if(data.quantity == 0) {
        removeEntryFromCartUtil(data.productId);
        return;
    }

    updateEntryOnCartLocal(data);

    var productId = data.productId;
    delete data.productId;

    const session = await getSession()
    if(session)
        return await updateEntryOnCart(productId, JSON.stringify(data));
}

export const deleteCartUtil = async () => {
    deleteCartLocal();
    
    const session = await getSession()
    if(session)
        return await deleteCart();
}

export const getUserCartUtil = async () => {
    var cart = JSON.parse(window.localStorage.getItem("cart"));

    var newArr = [];

    if(!cart) {
        window.localStorage.setItem("cart", JSON.stringify(newArr));
        return newArr;
    }

    const result = await getCartProductData(cart);

    cart.forEach((e) => {
        result.forEach((p) => {
            if(p._id == e.productId) {
                var o = {quantity: e.quantity, product: p}
                newArr.push(o);
            }
        })
    })
    
    return newArr;
}

const getCartProductData = async (cart) => {
    var ids = "";
    cart.forEach((e) => {
        ids = ids.concat(e.productId + ',');
    })
    ids = ids.replace(/(^,)|(,$)/g, "").trim();

    var url = `http://localhost:8000/api/product?ids=${ids}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
        })
        return await response.json();
    }
    catch(error) {
        console.log(error);
    }
}