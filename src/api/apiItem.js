import axios from 'axios';

const endpoint = "item" 
const api = `${import.meta.env.VITE_API_URL}/${endpoint}`;

async function getCraftList() {
  const data = await axios.get(`${api}/craft`);
  return data;
}
async function getItemList(arrayItems) {
  const data = await axios.post(api, {itemListId: arrayItems})
  return data;
}
async function getUniqueItem(id) {
  const data = await axios.get(`${api}/${id}`);
  return data;
}

export const apiItem = {
  getCraftList,
  getItemList,
  getUniqueItem
};