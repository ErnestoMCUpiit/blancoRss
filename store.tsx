import { configureStore } from '@reduxjs/toolkit';

const initialState = {
    noticias: []
};

const noticiasReducer = (state = initialState, action: any) => {
    switch (action.type) {

        default:
            return state;
    }
};


export default configureStore({
    reducer: {
        noticias: noticiasReducer
    }
});