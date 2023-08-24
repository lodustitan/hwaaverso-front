import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

export default function RewardBattle({ rewards, newRandomMonster }) {
  return (
    <Body>
      <RewardItems>
        {rewards.loot?.map(el => {
          return(
            <Item>
              <span>{el.count}</span>
              <img src={`${import.meta.env.VITE_API_URL}/sprites${el.sprite}`} alt="item" />
            </Item>
          );
        })}
      </RewardItems>
      <RewardCoins>
        <Resources>💼 {rewards.resources}</Resources>
      </RewardCoins>
      <Painel>
        <Button onClick={newRandomMonster}>Step</Button>
        <Link to='/map'><SmallButton>Quit</SmallButton></Link>
      </Painel>
    </Body>
  )
}


const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 250px;
  height: 350px;
  border-radius: 1rem;
  background-color: #bba089;
`
const RewardItems = styled.div`
  display: flex;
  box-sizing: border-box;
  overflow-y: auto;
  padding: 1rem;
  flex-wrap: wrap;
  width: 70%;
  height: 72px;
  background-color: #555;
  border: solid aliceblue;
  border-radius: 8px;
`
const RewardCoins = styled.div`
  background-color: #555;
  font-size: x-large;
  font-weight: 700;
  width: 70%;
  border: solid aliceblue;
  border-radius: 8px;
`
const Painel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Item = styled.div`
  position: relative;
  height: 48px;
  height: 48px;
  img {
    width: 100%;
    height: 100%;
  }
  span {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 1;
    color: aliceblue;
    font-weight: 900;
    -webkit-text-stroke: 1px black;
  }
`
const Resources = styled.div``
const Experience = styled.div``
const Button = styled.span`
  font-size: xx-large;
  padding: .5rem 3rem;
  background-color: dodgerblue;
`
const SmallButton = styled.span`
  font-size: large;
  padding: .3rem 2rem;
  background-color: crimson;
`