import axios from 'axios';

const endpoint = "story" 
const api = `${import.meta.env.VITE_API_URL}/${endpoint}`;

async function getStory(storyId, id, route) {
  const data = await axios.post(api, { storyId, id, route });
  return data;
}

export const apiStory = {
  getStory,
};