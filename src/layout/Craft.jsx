import styled from 'styled-components'
import React, { useContext, useEffect, useState } from 'react'
import Menu from '../containers/Menu'
import { apiItem } from '../api/apiItem'
import formatNumber from '../utils/formaterNumbers';
import apiDatabase from '../api/apiDatabase';
import { CharacterContext } from '../containers/App';
import { useNavigate } from 'react-router-dom';

export default function Craft() {
  const history = useNavigate();
  const { playerInfos, setPlayerInfos } = useContext(CharacterContext);
  const [inventory, setInventory] = useState();
  const [craftList, setCraftList] = useState();
  const [craftItem, setCraftItem] = useState({})

  const refreshItems = async () => {
    const items = await apiDatabase.getAllItems();
    setInventory(items);
  }
  const setCraftableItem = (target) => {
    setCraftItem({...craftItem, ...target});
  }
  const verifyCountItems = (item) => {
    for(let el of inventory) {
      if(item.itemId === el.itemId) {
        return {
          count: `${el.count}/${item.count}`,
          enough: el.count >= item.count,
        }
      }
    }
    return {
      count: `0/${item.count}`,
      enough: false,
    }
  }
  const doCraft = async () => {
    let isCraftable = true;
    for (const el of craftItem.itemsCost) {
      if(!verifyCountItems(el).enough) return isCraftable = false;
    }
    if(playerInfos.resources < craftItem.resourceCost) return isCraftable = false;
    if(playerInfos.fame.points < craftItem.fameCost) return isCraftable = false;
    
    for (const el of craftItem.itemsCost) {
      await apiDatabase.removeItemByItemId(el.itemId, el.count);
    }
    const removeResource = playerInfos.resources - craftItem.resourceCost;
    const removeFame = playerInfos.fame.points - craftItem.fameCost;
    const newPlayerSave = {...playerInfos, fame: {...playerInfos.fame, points: removeFame}, resources: removeResource};
    setPlayerInfos(newPlayerSave)
    await apiDatabase.addItem(craftItem.itemData);
    await apiDatabase.saveCharacter(newPlayerSave);
    history('/inventory');
  }

  useEffect(() => {
    const fetch = async () => {
      const response = await apiItem.getCraftList();
      setCraftList(response.data);
      await refreshItems()
    }
    fetch();
    return () => {}
  }, [])
  
  return (
    <>
      <Menu />
      <Body>
        <Content>
          <Item>
            {craftItem.itemData &&
            <>
            <div>
              <ItemImage src={`${import.meta.env.VITE_API_URL}/sprites${craftItem.itemData.sprite}`} />
            </div>
            <div>
              <ItemName>{craftItem.itemData.name}</ItemName>
              <ItemDescription>{craftItem.itemData.description}</ItemDescription>
            </div>
            </>}
          </Item>
          <Cost>
            <ItemsRequeriments>
              {
                craftItem.itemsCost?.map(el => 
                <ItemReq notEnough={verifyCountItems(el)?.enough}>
                  <ItemReqImage src={`${import.meta.env.VITE_API_URL}/sprites${el.itemData.sprite}`} />
                  <ItemReqName>{el.itemData.name}</ItemReqName>
                  {inventory && <ItemReqCount>{verifyCountItems(el)?.count}</ItemReqCount>}
                </ItemReq>
                )
              }
            </ItemsRequeriments>
              <Resources onClick={doCraft}>
              { craftItem.resourceCost && <span>💼 {formatNumber(craftItem.resourceCost)}</span>}
              { craftItem.fameCost > 0 && <span>💮 {formatNumber(craftItem.fameCost)}</span>}
              </Resources>
          </Cost>
        </Content>
        <List>
          {craftList?.map((el, index) => 
            <CraftItemsCategory 
              key={index}
              categoryName={el.category}
              listItem={el.listCraft}
              setCraftableItem={setCraftableItem} />
          )}
        </List>
      </Body>
    </>
  )
}

function CraftItemsCategory({categoryName, listItem, setCraftableItem}) {
  const [show, setShow] = useState(false);
  const showCategory = () => {
    setShow(!show);
  }

  return (
    <Category>
      <CategoryName onClick={showCategory}>{categoryName}</CategoryName>
      {(show && listItem) && 
        listItem?.map((el, index) => {
        return <CraftItem key={index} onClick={() => setCraftableItem(el)}>{el.itemData.name}</CraftItem>
      })
      }
    </Category>
  )
}



const Body = styled.div`
  min-width: 320px;
  box-sizing: border-box;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
  background-color: #d48a5e;
`;
const Item = styled.div`
  padding: .5rem;
  display: flex;
  align-items: center;
  height: 40%;
  div {
    &:nth-child(1) {
      width: 35%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &:nth-child(2) {
      width: 65%;
    }
    
    display: flex;
    flex-direction: column;
    padding: .5rem;
    height: 100%;
  }
`;
const ItemImage = styled.img`
  border-radius: 8px;
  border: solid aliceblue;
  height: 100%;
  width: fit-content;
  object-fit: cover;
`;
const ItemName = styled.span`
  text-align: left;
  font-weight: 700;
  font-size: large;
`;
const ItemDescription = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Cost = styled.div`
  display: flex;
  align-items: center;
  height: 55%;
`;
const ItemsRequeriments = styled.div`
  width: 70%;
  height: 100%;
  background-color: #474133;
  border: solid white;
  border-radius: 8px;
  overflow-y: auto;
`;
const Resources = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  background-color: #474133;
  border: solid white;
  border-radius: 8px;
`;
const List = styled.div`
  height: calc(100% - 35%);
  background-color: #96664b;
  overflow-y: auto;
  width: 100%;
`;
const Category = styled.div``;

const ItemReq = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .3rem;
  filter: ${({notEnough}) => !notEnough? 'brightness(75%)': 'none'};
  color: ${({notEnough}) => !notEnough? 'red': 'white'};;
`;
const ItemReqImage = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 4px;
  border: solid aliceblue;
`;
const ItemReqName = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const ItemReqCount = styled.div`
  padding: .2rem;
  border: solid aliceblue;
  border-radius: 4px;
  background-color: black;
`;

const CategoryName = styled.div`
  text-align: left;
  font-size: large;
  padding: .3rem 1rem;
  background-color: #444;
`;
const CraftItem = styled.div`
  padding: .5rem;
  border-bottom: 1px solid aliceblue;
`;
