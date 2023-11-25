import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fulfilled');
        setPersons(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  /* 
  
  useEffect(() => {
  console.log('effect');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/persons');
      const data = response.data;

      for (let i = 0; i < data.length; i++) {
        setTimeout(() => {
          setPersons((prevPersons) => [...prevPersons, data[i]]);
        }, (i + 1) * 2000); // 2-second delay between each item
      }
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  fetchData();
}, []);

  
  */

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const addPerson = async (event) => {
    event.preventDefault(); // Prevent default form submission

    try {
      const nameExists = persons.some((person) => person.name === newName);

      if (nameExists) {
        // Update existing person's number
        const updatedPersons = persons.map((person) =>
          person.name === newName ? { ...person, number: newNumber } : person,
        );
        setPersons(updatedPersons);
      } else {
        // Save a new person
        await savePerson(newName, newNumber);
        const personObject = {
          name: newName,
          number: newNumber,
          id: persons.length + 1,
        };
        setPersons([...persons, personObject]);
      }

      setNewName('');
      setNewNumber('');
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Create a function to save data
  const savePerson = async (name, number) => {
    try {
      const response = await axios.post('http://localhost:3001/persons', {
        name: name,
        number: number,
      });
      return response.data; // Optionally return data after saving
    } catch (error) {
      console.log('Error saving person: ', error);
      throw error;
    }
  };

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

      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
