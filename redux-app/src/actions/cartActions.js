import axios from 'axios';

// ADD TO CART

export const addToCart = (cart) => {
    return (dispatch) => {
        axios.post('/api/cart', cart)
        .then((response) => {
            dispatch({ type: "ADD_TO_CART", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "ADD_TO_CART_REJECTED", msg: 'error when adding to the cart!'})
        })
    }
}

export const deleteCartItem = (cart) => {
    return {
        type: 'DELETE_CART_ITEM',
        payload: cart
    }
}

export const updateCart = (_id, value, cart) => {
    const currentBookToUpdate = cart

    const indexToUpdate = currentBookToUpdate.findIndex(
        (book) => book._id === _id
    )

    const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + value
    }

    let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
    ...currentBookToUpdate.slice(indexToUpdate + 1)]

    return (dispatch) => {
        axios.post('/api/cart', cartUpdate)
        .then((response) => {
            dispatch({ type: "UPDATE_CART", payload: response.data })
        })
        .catch((err) => {
            dispatch({ type: "UPDATE_CART_REJECTED", msg: 'error when adding to the cart!'})
        })
    }
}