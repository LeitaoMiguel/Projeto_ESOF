export const addProductToCartLocal = async (newProduct) => {
    var storedCartStr = window.localStorage.getItem("cart");
    var currentCart = storedCartStr ? JSON.parse(storedCartStr) : [];

    var updated = false;
    if(currentCart.length > 0) {
        currentCart.forEach((e, index) => {
            if(!updated) {
                if(currentCart[index].productId == newProduct.productId) {
                    updated = true;
                    currentCart[index].quantity = parseInt(currentCart[index].quantity) + parseInt(newProduct.quantity);
                }
            }
        });
    }

    if(!updated)
        currentCart.push(newProduct);

    window.localStorage.setItem("cart", JSON.stringify(currentCart));
}

export const removeEntryFromCartLocal = (productId) => {
    var currentCart = JSON.parse(window.localStorage.getItem("cart"));

    let newcart = currentCart.filter(e => e.productId !== productId);

    window.localStorage.setItem("cart", JSON.stringify(newcart));
}

export const updateEntryOnCartLocal = (data) => {
    var currentCart = JSON.parse(window.localStorage.getItem("cart"));

    currentCart.forEach((e, i) => {
        if(e.productId == data.productId) {
            currentCart[i].quantity = data.quantity;
        }
    })

    window.localStorage.setItem("cart", JSON.stringify(currentCart));
}

export const deleteCartLocal = () => {
    window.localStorage.removeItem("cart");
}