import { useState, useEffect } from 'react';
import css from './App.module.css';
import Form from './Form/Form';
import ContactsList from './Contacts/ContactsList';
import { nanoid } from 'nanoid';
import Filter from './Filter/Filter';

const LS_KEY = "contacts";

 function App() {
  const [contacts, setContacts] = useState(
          [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
          ],
  );

  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));    
  }, [contacts]
    
  );

  const isDublicate = ({name, number}) => {
    const normilizedName = name.toLowerCase();
    const normalNumber = number;
    
    const dublicate = contacts.find(contact => {
      const normilizedCurrentName = contact.name.toLowerCase();
      const currentNumber = contact.number;
      return (normilizedCurrentName === normilizedName && currentNumber === normalNumber);
    } 
      )
      return Boolean(dublicate);
  }

  const addContact = (data) => {
      if(isDublicate(data)) {
          alert(`${data.name} is elready in contacts!`)
          return
        } else {
          setContacts(prevContacts => {
            const newContact = {
              id: nanoid(),
              ...data,
            };
            return [...prevContacts, newContact];
          }) 
      } 
  };
    
      const changeFilter = e => { setFilter(e.currentTarget.value);}
      
      const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();
    
        return contacts.filter(({name}) => 
          name.toLowerCase().includes(normalizedFilter),
        );
      };
    
      const deleteContact = contactID => {
        setContacts(prevContacts => 
         prevContacts.filter(contact => contact.id !== contactID),
        );
    
      };
    

    const visibleContacts = getVisibleContacts();      
  return (
        <div className={css.appContainer}>
          <h1>Phonebook</h1>
          <Form onSubmit={addContact}/>
          <h2>Contacts</h2>
          <Filter text='Search by name' value={filter} onChange={changeFilter}/>
          <ContactsList contacts={visibleContacts} deleteContact={deleteContact}/>
        </div>
      );     


};

export default App;
