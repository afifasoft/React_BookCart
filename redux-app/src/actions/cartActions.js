// ADD TO CART

export const addToCart = (book) => {
    return {
        type: 'ADD_TO_CART',
        payload: book
    }
}

export const deleteCartItem = (cart) => {
    return {
        type: 'DELETE_CART_ITEM',
        payload: cart
    }
}

export const updateCart = (_id, cart) => {
    return {
        type: 'UPDATE_CART',
        _id,
        unit
    }
}