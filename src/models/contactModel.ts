export interface ContactModel{
  "id": number,
  "firstName": string,
  "lastName": string,
  "phoneNumber": number,
  "email": string,
  "status": string
}

export interface ContactListModel{
  contact_list: ContactModel[],
  particular_contact: ContactModel
}