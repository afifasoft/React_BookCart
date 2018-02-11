// 3 - Define reducers
// create reducer by passing two arguments, state and action, and returning the state
export const booksReducers = (state = {
    books:
        []
}, action) => {
    // use of reducers is to evaluate what to do with received actions
    switch (action.type) {
        case "GET_BOOKS":
            return { ...state, books: [...action.payload] }
        case "POST_BOOK":
            // use concat to add item to state
            // let books = state.books.concat(action.payload)
            // return {books};

            // even better, use spread operator {...}
            return {
                ...state,
                books: [...state.books, ...action.payload],
                msg: 'Saved! Click to continue',
                style: 'success'
            }
        //  break;
        case "POST_BOOK_REJECTED":
            return {
                ...state,
                msg: 'Please try again',
                style: 'danger'
            }
        case "RESET_BUTTON":
            return {
                ...state,
                msg: null,
                style: 'primary'
            }
        case "DELETE_BOOK":
            //  console.log(action.payload)
            return { books: state.books.filter(({ _id }) => _id != action.payload) };

        // create a copy of current array of books
        //     const currentBookToDelete = [...state.books];
        // // determine index
        //     const indexToDelete = currentBookToDelete. findIndex((book) => {
        //         return book.id === action.payload.id
        //     })
        // // use slice to remove the book
        //     return {books: [...currentBookToDelete.slice(0, indexToDelete),
        //     ...currentBookToDelete.slice(indexToDelete + 1)]}
        //     break;
        case "EDIT_BOOK":
            return {
                books: state.books.map((book) => {
                    if (book._id === action.payload._id) {
                        return {
                            ...book,
                            ...action.payload.updates
                        }
                    } else {
                        return book;
                    }
                })
            }
        default:
            return state;
    }

}