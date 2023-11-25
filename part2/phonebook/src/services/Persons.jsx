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

export default { getAll, create, update, savePerson };
