import { createStore } from 'redux';

import reducers from './reducers/index';

// 1 - Create the store
// to create store pass the reducers to createStore method
const store = createStore(reducers);

// to see the current state of the store use subscribe method
store.subscribe(() => {
    console.log(`Current state is:`, store.getState())
})

// 2 - Create and dispatch actions
// Action is made by object that has two properties (type and payload)
//Type is a keyword, payload can be called as you wish
store.dispatch({ type: 'POST_BOOK', payload: 
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

});
store.dispatch({ type: 'POST_BOOK', payload: 
    [{
        id: 3,
        title: 'this is the book title',
        description: 'this is the description', 
        price: 33.33
    },
    {
        id: 4,
        title: 'This is second book',
        description: 'Second description',
        price: 25.00
    }] 

});
store.dispatch({type: 'DELETE_BOOK', payload: { id: 2 } });
store.dispatch({type: 'DELETE_BOOK', payload: { id: 3 } });
store.dispatch({type: 'EDIT_BOOK', payload: {
    id: 4,
    updates: {
        title: 'This is 44444444 book',
        price: 5000
    }
}});
store.dispatch({ type: 'POST_BOOK', payload: 
    [{
        id: 5,
        title: 'this is the  5  book title',
        description: 'this is the description', 
        price: 55.33
    },
    {
        id: 6,
        title: 'This is 666 book',
        description: 'Second description',
        price: 66.00
    }] 

});


// --->>> CART ACTIONS >>>---

store.dispatch({
    type: 'ADD_TO_CART', 
    payload: [{ id: 5 }] });
