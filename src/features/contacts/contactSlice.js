import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    contacts:[]
}
const contactSlice = createSlice({
    name:"contact",
    initialState,
    reducers:{
        setContacts:(state,action)=>{
            state.contacts = action.payload;
        },
        addContact:(state, action)=>{
            state.contacts.push(action.payload)
        },
        updateContact:(state,action)=>{
            const index = state.contacts.findIndex(
                contact => contact.phone_no === action.payload.phone_no
            )
            if (index === -1){
                state.contacts[index]= action.payload
            }
        }

    }
});


export const{setContacts,addContact,updateContact} = contactSlice.actions;
export default contactSlice.reducer;