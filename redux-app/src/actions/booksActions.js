export const getBooks = () => {
    return {
        type: 'GET_BOOKS'
    }
}

export const postBook = (book) => {
    return {
        type: 'POST_BOOK',
        payload: book
    }
}

export const deleteBook = (id) => {
    return {
        type: 'DELETE_BOOK',
        payload: id
    }
}

export const editBook = (book) => {
    return {
        type: 'EDIT_BOOK',
        payload: book
    }
}