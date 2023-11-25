import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

const update = async (id, updatedPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.data;
};

const savePerson = async (name, number) => {
  try {
    const response = await axios.post(baseUrl, { name, number });
    return response.data;
  } catch (error) {
    console.log('Error saving person: ', error);
    throw error;
  }
};

const deletePerson = async (id) => {
  try {
    // Send a DELETE request to the backend
    await axios.delete(`http://localhost:3001/persons/${id}`);
    // Optionally, return a success message or status if needed
    return { success: true, message: 'Person deleted successfully' };
  } catch (error) {
    // Handle errors if the deletion fails
    console.error('Error deleting person: ', error);
    throw error;
  }
};

export default { getAll, create, update, savePerson, deletePerson };
