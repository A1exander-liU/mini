import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});
