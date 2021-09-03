import axios from 'axios';

const baseUrl = "http://localhost:5600/persons";

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newContact => axios.post(baseUrl, newContact).then(response => response.data);

const deletePerson = index => axios.delete(`${baseUrl}/${index}`).then(response => response.data);

const replaceNumber = (index, updatedContact) => axios.put(`${baseUrl}/${index}`, updatedContact).then(response => response.data);

// to prevent an unexpected warning about assigning functions to an object before exporting
const exportedFunctions = {getAll, create, deletePerson, replaceNumber }
export default exportedFunctions;