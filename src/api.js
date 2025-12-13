import axios from 'axios';
const API_BASE = 'https://myshopbackend-gj8m.onrender.com/api';
export default axios.create({baseURL:API_BASE,timeout:5000});
