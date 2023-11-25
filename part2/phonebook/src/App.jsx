// Import necessary components and services
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService'; // Import the service

const App = () => {
  // State variables for managing persons, new name, new number, and search term
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch initial data from the backend using useEffect
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        console.log('Error fetching data: ', error);
      });
  }, []);

  // Function to handle deletion of a person
  const handleDelete = (id, name) => {
    const confirmDeletion = window.confirm(`Delete ${name}`);

    if (confirmDeletion) {
      personService
        .deletePerson(id)
        .then(() => {
          const updatedPersons = persons.filter((person) => person.id !== id);
          setPersons(updatedPersons);
        })
        .catch((error) => {
          console.error('Error deleting person: ', error);
        });
    }
  };

  // Function to handle name change input
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  // Function to handle number change input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  // Function to handle search input
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to add a new person
  const addPerson = async (event) => {
    event.preventDefault();

    try {
      const nameExists = persons.some((person) => person.name === newName);

      if (nameExists) {
        const updatedPersons = persons.map((person) =>
          person.name === newName ? { ...person, number: newNumber } : person,
        );
        setPersons(updatedPersons);
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        await personService.create(newPerson);
        const updatedPersons = await personService.getAll();
        setPersons(updatedPersons.data);
      }
      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.log(error.message);
    }
  };

  // Filter the persons based on the search term
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Return JSX with components and data passed as props
  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />

      <h3>Add a new</h3>

      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
