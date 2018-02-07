export const cartReducers = (state = { cart: [] }, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return { cart: [...state, ...action.payload] };
        case "DELETE_CART_ITEM":
            return { cart: [...state, ...action.payload] };
        case "UPDATE_CART":

            const currentBookToUpdate = [...state.cart]

            const indexToUpdate = currentBookToUpdate.findIndex(
                (book) => book._id === action._id
            )

            const newBookToUpdate = {
                ...currentBookToUpdate[indexToUpdate],
                quantity: currentBookToUpdate[indexToUpdate].quantity + 1
            }

            let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate,
            ...currentBookToUpdate.slice(indexToUpdate + 1)]

            console.log(cartUpdate)

            return {
                ...state,
                cart: cartUpdate
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

