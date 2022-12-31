import axios from "axios";

// Base da api https://api.themoviedb.org/3/
// API Key: f7b2c8034d48023fcf4ca01686e05e66

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;
