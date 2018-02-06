// 3 - Define reducers
// create reducer by passing two arguments, state and action, and returning the state
export const booksReducers = (state={
    books: 
        [{
            id: 1,
            title: 'this is the book title',
            description: 'this is the description',
            price: 33.33
        },
        {
            id: 2,
            title: 'This is second book',
            description: 'Second description',
            price: 25.00
        }]
}, action) => {
    // use of reducers is to evaluate what to do with received actions
    switch(action.type) {
        case "GET_BOOKS":
            return {...state, books: [...state.books]}
        case "POST_BOOK":
    // use concat to add item to state
    // let books = state.books.concat(action.payload)
    // return {books};

    // even better, use spread operator {...}
            return {books: [...state.books, ...action.payload]}
    //  break;
        case "DELETE_BOOK":
    //  console.log(action.payload)
            return {books: state.books.filter(({id}) => id !== action.payload.id)};
           
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
            return {books: state.books.map((book) => {
                if (book.id === action.payload.id) {
                    return {
                        ...book,
                        ...action.payload.updates
                    }
                } else {
                    return book;
                }
            })}
        default:
        return state;
    }
    
}