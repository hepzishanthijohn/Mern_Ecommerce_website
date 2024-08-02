import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'; // Import Axios

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        // Fetch all products using Axios
        axios.get('https://mern-e-commerce-website-7.onrender.com/allproducts')
            .then((response) => setAll_Product(response.data))
            .catch((error) => console.error('Error fetching all products:', error));

        // Fetch cart items if user is authenticated
        if (localStorage.getItem('auth-token')) {
            axios.post('https://mern-e-commerce-website-7.onrender.com/getcart', "", {
                headers: {
                    'Accept': 'application/json',
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => setCartItems(response.data))
            .catch((error) => console.error('Error fetching cart items:', error));
        }
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            axios.post('https://mern-e-commerce-website-7.onrender.com/addtocart',
                { itemId: itemId },
                {
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error adding the item to the cart!', error);
            });
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            axios.post('https://mern-e-commerce-website-7.onrender.com/removefromcart',
                { itemId: itemId },
                {
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                        'Content-Type': 'application/json',
                    }
                }
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('There was an error removing the item from the cart!', error);
            });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    };

    const contextValue = {
        getTotalCartItems,
        all_product,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
