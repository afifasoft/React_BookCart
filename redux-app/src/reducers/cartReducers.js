export const cartReducers = (state = { cart: [] }, action) => {
    switch (action.type) {
        case "GET_CART":
            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
            }
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



            return {
                ...state,
                cart: action.payload,
                totalAmount: totals(action.payload).amount,
                totalQty: totals(action.payload).qty
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

    return {
        amount: totalAmount.toFixed(2),
        qty: totalQty
    }
}

