import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './Components/ContactForm/ContactForm';
import Title from './Components/Title/Title';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

export default function App() {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const registeredContact = window.localStorage.getItem('contacts');

  const [contacts, setContacts] = useState(
    () => JSON.parse(registeredContact) ?? defaultContacts,
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = contacts.find(contact => contact.name === name);

    if (findContact) {
      alert(`${findContact.name} is already in contacts`);
      return;
    }

    setContacts(prevState => [...prevState, contact]);
  };

  const handleChangeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const filterInputId = nanoid();

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contactId !== contact.id));
  };

  const filterByName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <Title title="Phonebook">
      <ContactForm onSubmit={addContact} />

      <Title title="Contacts">
        <Filter
          id={filterInputId}
          value={filter}
          onChangeFilter={handleChangeFilter}
        />

        <ContactList
          onDeleteContact={deleteContact}
          contacts={filterByName()}
        />
      </Title>
    </Title>
  );
}
