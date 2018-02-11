import axios from 'axios';

export const getBooks = (books) => {
    return (dispatch) => {
        axios.get("/api/books", books)
            .then((response) => {
                dispatch({ type: "GET_BOOKS", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "GET_BOOKS_REJECTED", payload: "There was an error getting books!" })
            })
    }


    // return {
    //     type: 'GET_BOOKS'
    // }
}

export const postBook = (book) => {
    return (dispatch) => {
        axios.post("/api/books", book)
            .then((response) => {
                dispatch({ type: "POST_BOOK", payload: response.data })
            })
            .catch((err) => {
                dispatch({ type: "POST_BOOK_REJECTED", payload: "There was an error!" })
            })
    }

    // return {
    //     type: 'POST_BOOK',
    //     payload: book
    // }
}

export const deleteBook = (id) => {
    return (dispatch) => {
        axios.delete(`/api/books/${id}`)
            .then((response) => {
                dispatch({ type: "DELETE_BOOK", payload: id })
            })
            .catch((err) => {
                dispatch({ type: "DELETE_BOOK_REJECTED", payload: "Something went wrong!" })
            })
    }

    // return {
    //     type: 'DELETE_BOOK',
    //     payload: id
    // }
}

export const editBook = (book) => {
    return {
        type: 'EDIT_BOOK',
        payload: book
    }
}

export const resetButton = () => {
    return {
        type: 'RESET_BUTTON'
    }
} 