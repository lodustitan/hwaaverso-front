import React from 'react'
import styled from 'styled-components';
import apiDatabase from '../api/apiDatabase';
import { useLocation } from 'react-router-dom';

export default function Item({id, name, count, destroyItem, equipItem}) {
  const location = useLocation();
  return (
    <Body>
      <Description>{name} {count > 0 && `(${Number(count)}x)`}</Description>
      <ItemPanel>
        {location.state?.equip &&
          <span onClick={() => equipItem(id)}>🫳</span>}
        {!location.state?.equip && 
          <span onClick={() => destroyItem(id)}>🗑️</span>}
      </ItemPanel>
    </Body>
    )
}

const Body = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  height: 64px;
  background-color: #444;
`;
const Description = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 70%;
`;
const ItemPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 30%;
`;