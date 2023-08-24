import { useState } from "react";
import styled from "styled-components"

export default function Choices({ listChoices, action }) {
  const doOptionAction = (act, value) => action(act, value);

  return (
    <Body>
      {
        listChoices && listChoices.map((el, index) => {
          return (<div key={index} onClick={() => doOptionAction(el.action, el.value)}>
            {el.choiceText}
          </div>);
        })
      }
    </Body>
  )
}

const Body = styled.div`
  position: absolute;
  top: 10%;
  width: 100%;
  font-size: xx-large;
  
  div {
    transition: all 1s;
    background-color: rgba(0,0,0,.5);
    padding: 1rem;
    &:hover {
      background-color: rgba(0,0,0,1);
    }
  }
`;