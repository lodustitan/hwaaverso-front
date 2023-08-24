import styled from "styled-components";
import formatNumber from "../utils/formaterNumbers";

export default function PostiMagic({isCreator, views, likes}) {
  return (
    <Body>
      {isCreator ? <>
        <CreateNew>+</CreateNew>
      </>:
      <>
        <Content>
          <span>👁️ {formatNumber(views)}</span>
          <span>❤️ {formatNumber(likes)}</span>
        </Content>
      </>}
    </Body>
  );
}

const Body = styled.div`
  box-sizing: border-box;
  width: calc(100% / 3);
  height: 90px;
  border: solid black;
`;
const CreateNew = styled.div`
  font-size: 48px;
  font-weight: 900;
  background-color: #111;
  width: 100%;
  height: 100%;
`;
const Content = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: end;
  background-color: #222;
  span {
    font-size: large;
    font-weight: 700;
  }
`;