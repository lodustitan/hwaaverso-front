import localforage from "localforage";
import { apiItem } from "./apiItem";
import randomNumbers from "../utils/randomNumbers";

const crypto = getCrypto();
const INVENTORY_DATA = 'inventory';
const CHARACTER_DATA = 'character';
const IMAGIC_DATA = 'imagic';

async function createCharacter(newChar) {
  await localforage.setItem(CHARACTER_DATA, newChar);
}
async function saveCharacter(player) {
  await localforage.setItem(CHARACTER_DATA, player);
}
async function getCharacter() {
  return await localforage.getItem(CHARACTER_DATA);
}
async function clearCharacter() {
  await localforage.removeItem(CHARACTER_DATA);
}
async function clearInventory() {
  await localforage.removeItem(INVENTORY_DATA);
}
async function addItem(newItem) {
  if(isNaN(newItem.itemId)) return;
  if(isNaN(newItem.count)) return;

  let allItems = await localforage.getItem(INVENTORY_DATA);
  const { data } = await apiItem.getUniqueItem(newItem.itemId);
  data.id = crypto.randomUUID();
  if(!data.count) data.count = 0;
  if(data.count) data.count = 1;

  if(!Array.isArray(allItems)) {
    await localforage.setItem(INVENTORY_DATA, [data]);
    return;
  }
  
  const sameItem = allItems.find(el => el.itemId === data.itemId);

  if(sameItem) {
    if(sameItem.count > 0) sameItem.count += newItem.count;
    else allItems = [...allItems, data];
    await localforage.setItem(INVENTORY_DATA, allItems);
    return sameItem;
  } else {
    allItems = [...allItems, data];
    await localforage.setItem(INVENTORY_DATA, allItems);
    return allItems;
  }

}
async function removeItemById(id, count=1) {
  let item = await localforage.getItem(INVENTORY_DATA);
  const find = item.find(el => el.id === id);
  if(find.count <= count) {
    const inventoryWithoutDeletedItem = item.filter(el => el.id !== id);
    await localforage.setItem(INVENTORY_DATA, inventoryWithoutDeletedItem);
    return inventoryWithoutDeletedItem;
  } else {
    find.count -= count;
    await localforage.setItem(INVENTORY_DATA, item);
    return item;
  }
}
async function removeItemByItemId(itemId, count=1) {
  let item = await localforage.getItem(INVENTORY_DATA);
  const find = item.find(el => el.itemId === itemId);
  if(find.count <= count) {
    const inventoryWithoutDeletedItem = item.filter(el => el.itemId !== itemId);
    await localforage.setItem(INVENTORY_DATA, inventoryWithoutDeletedItem);
    return inventoryWithoutDeletedItem;
  } else {
    find.count -= count;
    await localforage.setItem(INVENTORY_DATA, item);
    return item;
  }
}
async function getItemById(id) {
  let item = await localforage.getItem(INVENTORY_DATA);
  return item.find(el => el.id === id);
}
async function getAllItems() {
  const allItems = await localforage.getItem(INVENTORY_DATA);
  if(!Array.isArray(allItems)) {
    await localforage.setItem(INVENTORY_DATA, []);
  } else {
    console.log(allItems);
    return allItems;
  }
}

async function getAllPosts() {
  const allPosts = await localforage.getItem(IMAGIC_DATA);
  if(!Array.isArray(allPosts)) {
    await localforage.setItem(IMAGIC_DATA, []);
  } else {
    console.log(allPosts);
    return allPosts;
  }
}
async function newPost(type) {
  const types = {
    resource: { trafic: 4, followersAttraction: [5, 20] }, 
    task: { trafic: 4, followersAttraction: [5, 30] }, 
    story: { trafic: 4, followersAttraction: [5, 20] },
  };
  const followersAttraction = randomNumbers(types[type].followersAttraction[0], types[type].followersAttraction[1]);
  const UID = crypto.randomUUID();
  const newPostObj = {
    postId: UID,
    views: 0,
    likes: 0,
    type: type,
    trafic: types[type].trafic,
    followersAttraction: followersAttraction,
    comments: [],
  };
}

function getCrypto() {
  if (typeof window !== 'undefined' && window.crypto) {
    return window.crypto;
  } else if (typeof require === 'function') {
    return require('crypto');
  } else {
    throw new Error('Não foi possível encontrar uma implementação de crypto');
  }
}



let apiDatabase = {
  clearInventory,
  createCharacter,
  getCharacter,
  addItem,
  removeItemByItemId,
  removeItemById,
  getItemById,
  getAllItems,
  clearCharacter,
  saveCharacter
}

export default apiDatabase;