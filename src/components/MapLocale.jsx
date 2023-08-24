import { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import randomNumbers from "../utils/randomNumbers";

export default function MapLocale({mapName, sprite, locales}){
  const [show, setShow] = useState(true);
  const [research, setResearch] = useState();
  const history = useNavigate();

  useEffect(() => {
    if(locales) {
      setResearch(locales);
    }
  }, [locales]);

  const startBattle = (monsterList) => {
    const random = randomNumbers(0, 10000);
    if(!monsterList) return false;
    
    for (const monster of monsterList) {
      if(random <= monster.chance) {
        history('/battle', {state: {monster, monsterList}})
      }
    }
  }


  return (
    <Body>
      <Label onClick={() => setShow(!show)}>
        <span>{mapName}</span>
        <img alt="label_back" src={sprite} />
      </Label>
      {show && 
        <ul>
          {research?.map((el, index) => {
            return (
              <li key={index} onClick={() => startBattle(el.research)}>{el.name}</li>
            ); 
          })}
        </ul>
      }
    </Body>
  );
}

const Body = styled.div`
  width: 100%;
  margin-bottom: 1rem;
  ul {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    padding: 0;
    list-style: none;
    li {
      width: 90%;
      border-radius: 10px;
      border: solid black;
      background-color: #a15353;
      text-align: start;
      padding: .5rem;
      margin-bottom: .5rem;
    }
  }
`;
const Label = styled.div`
  position: relative;
  width: 100vw;
  height: 60px;
  border: solid black;
  span {
    font-size: x-large;
    position: absolute;
    left: 1rem;
    top: .7rem;
  }
  img { 
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;