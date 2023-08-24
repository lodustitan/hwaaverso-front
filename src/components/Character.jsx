import styled from "styled-components"

export default function Character({ sprite }) {
  return (
    <Body>
      <img src={sprite} />
    </Body>
  )
}

const Body = styled.div`
  position: absolute;
  bottom: 20%;
  left: 10%;
  img {
    width: 40vw;
    height: 40vh;
  }
`;