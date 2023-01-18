import { createContext, useState } from "react";

type CartType = {
    cartUpdate: number;
    setCartUpdate: (c: number) => void;
};

export const CartContext = createContext<CartType>({
    cartUpdate: 0,
    setCartUpdate: () => {},
});

const CartContextProvider = ({ children }) => {
    const [cartUpdate, setCartUpdate] = useState<number>(0);

    return (
        <CartContext.Provider value={{ cartUpdate, setCartUpdate }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;