import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault(); // Prevent default form submission

    const nameExists = persons.some((person) => person.name === newName);

    if (nameExists) {
      const updatedPersons = persons.map((person) =>
        person.name === newName ? { ...person, number: newNumber } : person,
      );
      setPersons(updatedPersons);
      setNewName(''); // Clear the input fields after updating the number
      setNewNumber('');
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      setPersons([...persons, personObject]);
      setNewName(''); // Clear the input fields after adding the name and number
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person, index) => (
        <div key={index}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
