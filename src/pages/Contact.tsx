import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import ContactForm from '../components/ContactForm';
import ContactsList from '../components/ContactsList';
import { ContactModel } from '../models/contactModel';
import { clearParticularContact, setParticularContact } from '../redux/slices/contactSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const Contact = () => {

  const { particular_contact, contact_list } = useAppSelector(store => store.contact)
  const [showAddContactForm, setShowAddContactForm] = useState(false);
  const [showEditContactForm, setShowEditContactForm] = useState(false);
  const dispatch = useAppDispatch();

  const handleAddContactForm = () => {
    setShowAddContactForm(!showAddContactForm);
  }

  const handleEditContactForm = (id: number) => {
    setShowEditContactForm(!showEditContactForm);
    const contactData = contact_list.filter((contact) => contact.id === id)
    dispatch(setParticularContact({...contactData[0]}));
  }

  const closeContactForm = () => {
    setShowAddContactForm(false);
    setShowEditContactForm(false);
    dispatch(clearParticularContact());
  }

  return (
    <>
      { (!showAddContactForm && !showEditContactForm) && <ContactsList handleAddContactForm={handleAddContactForm} handleEditContactForm={handleEditContactForm}/>}
      { showAddContactForm && <ContactForm closeContactForm={closeContactForm}/> }
      { showEditContactForm && <ContactForm closeContactForm={closeContactForm}/> }
    </>

  )
}

export default Contact