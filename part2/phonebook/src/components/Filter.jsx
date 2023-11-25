// Filter component
const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <div>
      Filter shown with&nbsp;
      <input
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search...'
      />
    </div>
  );
};

export default Filter;
