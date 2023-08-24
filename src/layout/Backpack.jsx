import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Menu from '../containers/Menu';
import Item from '../components/Item';

import apiDatabase from '../api/apiDatabase';
import { CharacterContext } from '../containers/App';

export default function Backpack() {
  const location = useLocation();
  const history = useNavigate();
  const player = useContext(CharacterContext);

  const [itemAdm, setItemAdm] = useState();
  const [itemCountAdm, setItemCountAdm] = useState();
  const [resourceAdm, setResourceAdm] = useState();
  const [inventory, setInventory] = useState();

  useEffect(() => {
    async function fetch() { await refreshItems() }
    fetch();
  }, [])

  const addResourceTest = async () => {
    if(!Number(resourceAdm)) return;
    const addResource = player.playerInfos.resources + Number(resourceAdm);
    const newPlayerSave = {...player.playerInfos, resources: addResource};
    player.setPlayerInfos(newPlayerSave)
    await apiDatabase.saveCharacter(newPlayerSave);
  }
  const addItemTest = async () => {
    await apiDatabase.addItem({itemId: Number(itemAdm), count: Number(itemCountAdm)});
    await refreshItems();
  }
  const refreshItems = async () => {
    const items = await apiDatabase.getAllItems();
    if(location.state) {
      const filteredItems = items.filter(el => el.type === location.state.filter);
      setInventory(filteredItems);
      return;
    }
    setInventory(items);
  }
  const clearItems = async () => {
    await apiDatabase.clearInventory()
    await refreshItems();
  }
  const destroyItem = async (id) => {
    await apiDatabase.removeItemById(id);
    await refreshItems();
  }
  const equipItem = async (id) => {
    const slot = player.playerInfos.equip[location.state.filter];
    const clickedItem = inventory.filter(el => el.id === id)[0];
    const newPlayerSave = {...player.playerInfos};
    newPlayerSave.equip[location.state.filter] = clickedItem
    if(!slot) {
      player.setPlayerInfos(newPlayerSave);
      await apiDatabase.saveCharacter(newPlayerSave);
      await apiDatabase.removeItemById(id);
    } else {
      await apiDatabase.addItem({itemId: slot.itemId, count: slot.count});
      const newPlayerSave = {...player.playerInfos, [location.state.filter]: clickedItem};
      player.setPlayerInfos(newPlayerSave);
      await apiDatabase.saveCharacter(newPlayerSave);
      await apiDatabase.removeItemById(id);
    }
    history('/');
  }

  return (
    <>
      <Menu />
      <Body>
        <>
          <input type='number' placeholder='item ID' onChange={(event) => setItemAdm(event.target.value)} value={itemAdm} />
          <input type='number' placeholder='item count' onChange={(event) => setItemCountAdm(event.target.value)} value={itemCountAdm} />
          <button onClick={addItemTest}>Adicionar Item (ADM)</button>
          <input type='number' placeholder='resource count' onChange={(event) => setResourceAdm(event.target.value)} value={resourceAdm} />
          <button onClick={addResourceTest}>Adicionar resource (ADM)</button>
          <button onClick={clearItems}>Limpar Inventario</button>
        </>
        <ListItems>
          {inventory?.map((el, index) => {
            return <Item key={index}
              id={el.id}
              name={el.name}
              count={el.count}
              destroyItem={destroyItem}
              equipItem={equipItem} />
          })}
        </ListItems>
      </Body>
    </>
  )
}

const Body = styled.div`
  box-sizing: border-box;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`
const ListItems = styled.div`
  width:100%; 
`;