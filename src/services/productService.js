import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const getAll = () => {
  return axios.get(API_URL);
};

const create = (product) => {
  return axios.post(API_URL, product);
};

const update = (id, product) => {
  return axios.put(`${API_URL}/${id}`, product);
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export default {
  getAll,
  create,
  update,
remove,
};
