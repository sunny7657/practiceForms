import axios from 'axios';

const API_KEY = 'JBiM9EXvVS75O9Zq1JWbwXfe4b9NVNIH8JXtGvLz7yrdCj3rrEbcwHMk';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(`search?query=${query}&page=${page}`);
  console.log(data);
  return data;
};
