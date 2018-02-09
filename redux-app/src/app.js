import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// import react-router

import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import { applyMiddleware ,createStore } from 'redux';
import logger from 'redux-logger'

// import combined reducers
import reducers from './reducers/index';

// import actions
import { addToCart } from './actions/cartActions';
import { postBook, deleteBook, editBook } from './actions/booksActions';

// 1 - Create the store
// to create store pass the reducers to createStore method
const middleware = applyMiddleware(logger)
const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

import BooksList from './components/pages/BooksList';
import Cart from './components/pages/Cart';
import BooksForm from './components/pages/BooksForm';
import Main from './main';

// to see the current state of the store use subscribe method
// store.subscribe(() => {
//     console.log(`Current state is:`, store.getState())
// })

const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>>
                <IndexRoute component={BooksList} />
                <Route path="/admin" component={BooksForm} />
                <Route path="/cart" component={Cart} />
            </Route>
        </Router>
    </Provider>
)

// Render components

render (
    Routes, document.getElementById('app')
)


// 2 - Create and dispatch actions
// Action is made by object that has two properties (type and payload)
//Type is a keyword, payload can be called as you wish


// store.dispatch({
//     type: 'POST_BOOK', payload:
//         [{
//             id: 3,
//             title: 'this is the book title',
//             description: 'this is the description',
//             price: 33.33
//         },
//         {
//             id: 4,
//             title: 'This is second book',
//             description: 'Second description',
//             price: 25.00
//         }]

// });
// store.dispatch(deleteBook({ id: 2 }));
// store.dispatch(deleteBook({ _id: 2 }));

// store.dispatch(editBook(
//     {
//         id: 4,
//         updates: {
//             title: 'This is 44444444 book',
//             price: 5000
//         }
//     }
// ));

// store.dispatch(postBook(
//     [{
//         id: 5,
//         title: 'this is the  5  book title',
//         description: 'this is the description',
//         price: 55.33
//     },
//     {
//         id: 6,
//         title: 'This is 666 book',
//         description: 'Second description',
//         price: 66.00
//     }]
// ))



// --->>> CART ACTIONS >>>---

// store.dispatch(addToCart([{ id: 1 }]))