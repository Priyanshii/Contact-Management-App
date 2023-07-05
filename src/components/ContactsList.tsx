import React from 'react'
import { AiOutlinePlus } from "react-icons/ai"
import { updateContactList } from '../redux/slices/contactSlice'
import { useAppDispatch, useAppSelector } from '../redux/store'

interface contactListProps{
  handleAddContactForm: () => void,
  handleEditContactForm: (id:number) => void,
}

const ContactsList = ({handleAddContactForm, handleEditContactForm}:contactListProps) => {

  const { contact_list } = useAppSelector(store => store.contact)
  const dispatch = useAppDispatch();

  const handleDeleteButton = (id:number) => {
    const newContactData = contact_list.filter((contact) => contact.id !== id)
    dispatch(updateContactList(newContactData));
  }

  const handleEditButton = (id:number) => {
    handleEditContactForm(id);
  }
  return (
    <div className='flex flex-col gap-14'>
      <div className='flex flex-col sm:flex-row justify-between items-center'>
        <h5 className='font-bold text-2xl'>
          Contacts
        </h5>
        <button className='flex flex-row items-center justify-between font-normal text-sm uppercase tracking-[0.015em] px-4 py-3 bg-green-700 shadow-md text-white rounded-md hover:bg-green-800' onClick={handleAddContactForm}>
          <AiOutlinePlus className='text-lg mr-2'/>
          Add Contact
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        <span className='text-sm font-medium uppercase'>Contacts List</span>
        {
          contact_list.length
          ?
        <section className='flex flex-col bg-white shadow-lg'>
          {
            contact_list.map((contact, index) => {
              return(
                <div className='flex flex-row justify-end items-center gap-3 border-solid border-b-2 border-gray-200 p-4'>
                  <span className='mr-auto text-base font-normal'>{index+1}. {contact.firstName + " " + contact.lastName}</span>
                  <button onClick={() => handleEditButton(contact.id)}  className='font-normal text-sm uppercase tracking-[0.015em] px-2 py-1 bg-green-700 shadow-md text-white rounded-md hover:bg-green-800'>Edit</button>
                  <button onClick={() => handleDeleteButton(contact.id)} className='font-normal text-sm uppercase tracking-[0.015em] px-2 py-1 bg-red-600 shadow-md text-white rounded-md hover:bg-red-700'>Delete</button>
                </div>
              )
            })
          }
        </section>     
          :
          <div className='bg-gray-100 shadow-none p-10 flex flex-col items-center justify-center'>
            <p>No contact found.</p>
            <p>Please add contact from Add contact button</p>
          </div>
        }
      </div>
    </div>
  )
}

export default ContactsList