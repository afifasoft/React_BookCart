export const cartReducers = (state = { cart: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { 
                cart: [...state, ...action.payload], 
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            };
        case "DELETE_CART_ITEM":
            return { 
                cart: [...state, ...action.payload],
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            };
        case "UPDATE_CART":

            const currentBookToUpdate = [...state.cart]

            const indexToUpdate = currentBookToUpdate.findIndex(
                (book) => book._id === action._id
            )

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + action.value
            }

            let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate + 1)]

            console.log(cartUpdate)

            return {
                ...state,
                cart: cartUpdate,
                totalAmount: totals(cartUpdate).amount,
                totalQty: totals(cartUpdate).qty
            }

        // return {books: state.books.map((book) => {
        //     if (book._id === action.payload._id) {
        //         return {
        //             ...book,
        //             ...action.payload.updates
        //         }
        //     } else {
        //         return book;
        //     }
        // })}
    }
    return state
}

// CALCULATE TOTALS

export const totals = (payloadArr) => {
    const totalAmount = payloadArr.map((cartArr) => {
        return cartArr.price * cartArr.quantity;
    }).reduce((a, b) => {
        return a + b;
    }, 0); // start summing from index 0

    const totalQty = payloadArr.map((qty) => {
        return qty.quantity;
    }).reduce((a, b) => {
        return a + b;
    }, 0)

    return {amount: totalAmount.toFixed(2),
            qty: totalQty    
    }
}

