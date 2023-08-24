import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import Menu from "../containers/Menu";
import { CharacterContext } from "../containers/App";
import apiDatabase from "../api/apiDatabase";


export default function Home() {
  const history = useNavigate();
  const { playerInfos } = useContext(CharacterContext);
  console.log(playerInfos.equip)
  const resetCharacter = async () => {
    await apiDatabase.clearCharacter();
    history(0);
  }
  const setEquip = (filter) => {
    history('/inventory', { state: {filter, equip: true} })
  }

  return (
    <>
    <Menu />
    <Body>
      <CharacterInfos>
        <CharacterInfosInternal>
          {playerInfos && 
          <>
            <div className="CharacterInfosInternal_superiorInfos">
              <span onClick={resetCharacter}>(click to reset) Enjoy {playerInfos.nickname}</span>
              <span>💵 {playerInfos.gwans} Gwans</span>
              <span>💼 {playerInfos.resources} Recursos</span>
            </div>
            <div className="CharacterInfosInternal_inferiorInfos">
              <div>
                <span>{playerInfos.stats.strength}</span> 
                <span>MARTIAL</span>
              </div>
              <div>
                <span>{playerInfos.stats.intellect}</span> 
                <span>MAGICAL</span>
              </div>
              <div>
                <span>{playerInfos.stats.react}</span> 
                <span>SPEED</span>
              </div>
            </div>
          </>}
        </CharacterInfosInternal>
      </CharacterInfos>
      <Equip>
        {playerInfos.equip && 
          <>
            <EquipItem onClick={() => setEquip('outfit')}>
              {playerInfos.equip.outfit?.name}
            </EquipItem>
            <EquipItem onClick={() => setEquip('weapon')}>
              {playerInfos.equip.weapon?.name}
            </EquipItem>
            <EquipItem onClick={() => setEquip('aura')}>
              {playerInfos.equip.aura?.name}
            </EquipItem>
            <EquipItem onClick={() => setEquip('acessory')}>
              {playerInfos.equip.acessory?.name}
            </EquipItem>
          </>}
      </Equip>
      <HomeActions>
        <div>Menu de Ações</div>
        <ul>
          <li>🏠 My House <span>(Coming Soon)</span></li>
          <li>
            <StyledLink to='/inventory'>🎒 Inventory</StyledLink>
          </li>
          <li>
            <StyledLink to='/craft'>📜 Craft and Alchemy</StyledLink>
          </li>
          <li>🦾 Traits <span>(Coming Soon)</span></li>
          <li>🪙 Trade Market <span>(Coming Soon)</span></li>
        </ul>
      </HomeActions>
    </Body>
    </>
  );
}
const StyledLink = styled(Link)`
  color: white;
  &:focus {
    color: white;
  }
`;
const Body = styled.div`
  box-sizing: border-box;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  &>* { margin: 1rem 0 }
`;

const CharacterInfos = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 94%;
  padding: 1rem;
  height: 250px;
  background-color: #161616;
  border-radius: 6px;
`;

const CharacterInfosInternal = styled.div`
  width: 100%;
  color: white;
  .CharacterInfosInternal_superiorInfos {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50%;
    span {
      font-size: larger;
      font-weight: 700;
    }
  }
  .CharacterInfosInternal_inferiorInfos {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 50%;
    div {
      display: flex;
      flex-direction: column;
      span:nth-child(1){
        font-size: xx-large;
      }
    }
  }
`;

const HomeActions = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 94%;
  padding: 1rem;
  background-color: #161616;
  border-radius: 6px;
  div { font-size: larger }
  ul {
    padding: 0;
    list-style: none;
    li { 
      padding: 8px 0;
      text-align: left; 
      font-size: x-large;
      &:nth-child(3) span { color: red }
      span {
        font-size: small;
        font-weight: 200;
      }
    }
  }
`;
const Equip = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  box-sizing: border-box;
  min-height: calc(288px + 64px);
  width: 94%;
  padding: 1rem;
  background-color: #161616;
  border-radius: 6px;
`;

const EquipItem = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 1rem;
  background-color: black;
  border-radius: 6px;
  height: 64px;
  width: 100%;
`;