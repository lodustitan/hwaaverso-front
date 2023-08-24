import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Menu() {
  return (
    <Body>
      <ul>
        <li>
          <StyledLink to={"/"}>Home</StyledLink>
        </li>
        <li>
          <StyledLink to={"/map"}>Map</StyledLink>
        </li>
        <li>
          <StyledLink to={"/"}>iMagic</StyledLink>
        </li>
      </ul>
    </Body> 
  )
}

const StyledLink = styled(Link)`
  color: white;
  &:active {
    color: black;
  }
  &:focus {
    color: black;
  }
`;

const Body = styled.div`
  background-color: #c5473e;
  width: 100%;
  height: 64px;
  ul {
    display: flex;
    padding: 0;
    list-style: none;
    justify-content: space-around;
    li {
      padding: 4px 1rem;
    }
  }
`;
