import axios from 'axios';

const endpoint = "map" 
const api = `${import.meta.env.VITE_API_URL}/${endpoint}`;

async function getMaps() {
  const data = await axios.get(api);
  return data;
}
async function getMonster(id) {
  const data = await axios.get(`${api}/${id}`);
  return data;
}

export const apiMap = {
  getMaps,
  getMonster
};