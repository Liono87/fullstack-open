// Import necessary components and services
import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/personService'; // Import the service
import Notification from './components/Notification';

const App = () => {
  // State variables for managing persons, new name, new number, and search term
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);

  // Fetch initial data from the backend using useEffect
  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
      .catch((error) => {
        setErrorMessage('Error fetching data: ' + error.message);
        setTimeout(() => {
          setErrorMessage(null);
        }, 15000);
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
          setIsDeleted(true);
          setErrorMessage({
            message: `Deleted ${name} from the phonebook`,
            type: 'delete',
          });
          setTimeout(() => {
            setErrorMessage(null);
          }, 1000);
        })
        .catch((error) => {
          setErrorMessage('Error fetching data: ' + error.message);
          setTimeout(() => {
            setErrorMessage(null);
          }, 15000);
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
      if (isDeleted) {
        setErrorMessage({
          message: `Information of ${newName} has already been deleted from the server`,
          type: 'updateDeleted', // Specify the type for attempting to update a deleted entry
        });
        setTimeout(() => {
          setErrorMessage(null);
        }, 15000);
        // Reset the deletion flag
        setIsDeleted(false);
        // Exit the function
        return;
      }

      const existingPerson = persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      );

      if (existingPerson) {
        const confirmUpdate = window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`,
        );

        if (confirmUpdate) {
          await personService.update(existingPerson.id, {
            ...existingPerson,
            number: newNumber,
          });

          const updatedPersons = await personService.getAll();
          setPersons(updatedPersons.data);
          setErrorMessage({ message: `Updated ${newName}`, type: 'success' });
          setTimeout(() => {
            setErrorMessage(null);
          }, 15000);
        }
      } else {
        const newPerson = {
          name: newName,
          number: newNumber,
        };
        await personService.create(newPerson);
        const updatedPersons = await personService.getAll();
        setPersons(updatedPersons.data);
        setErrorMessage({ message: `Added ${newName}`, type: 'add' });
        setTimeout(() => {
          setErrorMessage(null);
        }, 10000);
      }
      setNewName('');
      setNewNumber('');
    } catch (error) {
      setErrorMessage({
        message: 'Error adding/updating person: ' + error.message,
        type: 'error',
      });
      setTimeout(() => {
        setErrorMessage(null);
      }, 15000);
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

      <Notification message={errorMessage} />

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
