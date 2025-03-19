import { configureStore } from "@reduxjs/toolkit";
import contactReducer from '../features/contacts/contactSlice';

const store = configureStore({
    reducer:{
        contact: contactReducer,
    }
});

export default store;