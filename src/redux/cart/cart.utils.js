export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingItem = cartItems.find(item => 
        item._id === cartItemToAdd._id
    );

    if (existingItem) {
        return cartItems.map(item =>
            item._id === cartItemToAdd._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
    }

    return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const existingItem = cartItems.find(item =>
        item._id === cartItemToRemove._id
    );

    if (existingItem.quantity === 1) {
        return cartItems.filter(item => item._id !== existingItem._id)
    }
    
    return cartItems.map(item => 
        item._id === cartItemToRemove._id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
}