// Persons component to render all people from the phonebook
const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          {person.name} {person.number}
        </div>
      ))}
    </>
  );
};

export default Persons;
