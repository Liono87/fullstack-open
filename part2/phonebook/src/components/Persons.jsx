// Persons component to render all people from the phonebook
const Persons = ({ filteredPersons, handleDelete }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
          &nbsp;
          <button
            className='backgroundColor:blue, borderRadius:5px'
            onClick={() => handleDelete(person.id, person.name)}
            style={deleteButtonStyle}
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
};

const deleteButtonStyle = {
  backgroundColor: 'blue',
  borderRadius: '5px',
  padding: '5px',
  fontSize: '8px',
  cursor: 'pointer',
  marginBottom: '10px',
};

export default Persons;
