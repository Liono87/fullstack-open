// PersonForm component
const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: &nbsp;
        <input
          id='nameInput'
          name='name'
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: &nbsp;
        <input
          id='numberInput'
          name='number'
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
