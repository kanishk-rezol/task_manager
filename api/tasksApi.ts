import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const fetchTasks = async () => {
  const response = await api.get('/todos');
  return response.data;
};
