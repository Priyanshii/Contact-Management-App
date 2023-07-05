import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactModel, ContactListModel } from "../../models/contactModel";

const initialState: ContactListModel={
  contact_list:[],
  particular_contact:{
    "id": 0,
    "firstName": "",
    "lastName": "",
    "phoneNumber": 0,
    "email": "",
    "status": ""
  }
}

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    addContact: (state,action: PayloadAction<ContactModel>)=>{
      state.contact_list = [...state.contact_list, action.payload]
    },
    updateContactList: (state,action: PayloadAction<ContactModel[]>)=>{
      state.contact_list = action.payload
    },
    setParticularContact: (state, action: PayloadAction<ContactModel>) => {
      state.particular_contact = action.payload
    },
    clearParticularContact: (state) => {
      state.particular_contact = {
        "id": 0,
        "firstName": "",
        "lastName": "",
        "phoneNumber": 0,
        "email": "",
        "status": ""
      }
    }
  },
});

export const { addContact, updateContactList, setParticularContact, clearParticularContact } = contactSlice.actions;

export default contactSlice.reducer;
