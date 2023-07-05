import React, { FormEvent, ReactElement, useState } from 'react'
import { BsArrowLeft } from "react-icons/bs"
import { addContact, updateContactList } from '../redux/slices/contactSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

interface contactFormProps{
  closeContactForm: () => void,
}

const ContactForm = ({closeContactForm}: contactFormProps) => {
 
  const { particular_contact, contact_list } = useAppSelector(store => store.contact)
  const [formData, setFormData] = useState({
    firstName: particular_contact.firstName,
    lastName: particular_contact.lastName,
    phoneNumber: particular_contact.phoneNumber,
    email: particular_contact.email,
    status: particular_contact.status,
  });

  const dispatch = useAppDispatch();

  const uniqueId = Date.now();

  const handleFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    setFormData((formData) => ({
      ...formData,
      [name]: value
    }))
  }
  
  const handleSaveButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if( particular_contact.id != 0){
      const newContactList = contact_list.map((contact) => {
        if(contact.id === particular_contact.id){
          return {
            id: contact.id,
            ...formData
          }
        }
        else{
          return {...contact}
        }
      })
      dispatch(updateContactList(newContactList))
    }
    else{
      const newObject = {id: uniqueId, ...formData};
      dispatch(addContact(newObject))
    }
    closeContactForm();
  }

  return (
    <div className='bg-white shadow-md p-8 flex flex-col relative'>
    <BsArrowLeft onClick={closeContactForm} className='font-bold stroke-1 text-base text-black absolute top-5 left-4 cursor-pointer'/>
      <h5 className='font-medium text-2xl text-center tracking-[0.015em] mb-16'>
        Contact Form
      </h5>
      <section className='flex flex-col items-start justify-start gap-4'>
        <section className='flex flex-row items-center justify-start gap-16'>
          <div className='flex flex-col items-start justify-center gap-1'>
            <label className='text-sm font-normal tracking-[0.015em]'>
              First Name:
            </label>
            <input onChange={(e) => {handleFormData(e)}} value={formData.firstName} name="firstName" type="text" required className='text-sm p-1 bg-gray-100 border-[1px] border-solid border-transparent focus:border-gray-500 rounded-sm focus:ring-0 outline-none'/>
          </div>
          <div className='flex flex-col items-start justify-center gap-1'>
            <label className='text-sm font-normal tracking-[0.015em]'>
              Last Name:
            </label>
            <input onChange={(e) => {handleFormData(e)}} value={formData.lastName} name="lastName" type="text" required className='text-sm p-1 bg-gray-100 border-[1px] border-solid border-transparent focus:border-gray-500 rounded-sm focus:ring-0 outline-none'/>
          </div>
        </section>
        <div className='flex flex-col items-start justify-center gap-1'>
          <label className='text-sm font-normal tracking-[0.015em]'>
            Phone Number:
          </label>
          <input onChange={(e) => {handleFormData(e)}} value={formData.phoneNumber} name="phoneNumber" type="number" required className='text-sm p-1 bg-gray-100 border-[1px] border-solid border-transparent focus:border-gray-500 rounded-sm focus:ring-0 outline-none'/>
        </div>
        <div className='flex flex-col items-start justify-center gap-1'>
          <label className='text-sm font-normal tracking-[0.015em]'>
            Email:
          </label>
          <input onChange={(e) => {handleFormData(e)}} value={formData.email} name="email" type="text" required className='text-sm p-1 bg-gray-100 border-[1px] border-solid border-transparent focus:border-gray-500 rounded-sm focus:ring-0 outline-none'/>
        </div>
        <div className='flex flex-row items-start justify-center gap-3 mt-2'>
          <span className='text-sm font-normal tracking-[0.015em]'>Select:</span>
          <label className='text-sm font-normal tracking-[0.015em] flex items-center gap-1'>
            <input onChange={(e) => {handleFormData(e)}} name="status" type="radio" value="active" checked={formData.status=== "active"}/>
            Active
          </label>
          <label className='text-sm font-normal tracking-[0.015em] flex items-center gap-1'>
            <input onChange={(e) => {handleFormData(e)}} name="status" type="radio"  value="inactive"  checked={formData.status=== "inactive"}/>
            Inactive
          </label>
        </div>
      </section>
      <div className="m-auto">
        <button type='submit' disabled={formData.firstName === ""} className={`${(formData.firstName === "") ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-800" } font-normal text-sm uppercase tracking-[0.015em] px-5 py-3 shadow-md text-white rounded-md `} onClick={(e) => {handleSaveButton(e)}}>Save</button>
      </div>
    </div>
  )
}

export default ContactForm