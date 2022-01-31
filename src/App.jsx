import React from 'react';
import ContactForm from './Components/ContactForm/ContactForm';
import Title from './Components/Title/Title';
import { nanoid } from 'nanoid';
import ContactList from './Components/ContactList/ContactList';
import Filter from './Components/Filter/Filter';

export default class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const findContact = this.state.contacts.find(
      contact => contact.name === name,
    );

    if (findContact) {
      alert(`${findContact.name} is already in contacts`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  handleChangeFilter = filter => {
    this.setState({ filter });
  };

  filterInputId = nanoid();

  deleteContact = contactId => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contactId !== contact.id),
    }));
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { contacts, value } = this.state;
    const filteredContacts = this.filterByName();

    return (
      <Title title="Phonebook">
        <ContactForm onSubmit={this.addContact}></ContactForm>

        {contacts.length > 0 && (
          <Title title="Contacts">
            {contacts.length > 2 && (
              <Filter
                id={this.filterInputId}
                value={value}
                onChangeFilter={this.handleChangeFilter}
              />
            )}
            <ContactList
              onDeleteContact={this.deleteContact}
              contacts={filteredContacts}
            ></ContactList>
          </Title>
        )}
      </Title>
    );
  }
}
