import styled from "styled-components";
import MapLocale from "../components/MapLocale";
import Menu from "../containers/Menu";
import { apiMap } from "../api/apiMap";
import { useEffect, useState } from "react";

export default function Map(){
  const [maps, setMaps] = useState()
  useEffect(() => {
    const fetch = async () => {
      const response = await apiMap.getMaps();
      setMaps(response.data);
    }
    fetch();
  }, [])
  
  return (
    <>
      <Menu />
      <Body>
        {maps?.map((el, index) => {
          return (
            <MapLocale 
              kay={index}
              mapName={el.name}
              locales={el.subLocals}
              sprite={el.labelImage}
            />)
        })}
      </Body>
    </>
  );
}

const Body = styled.div`
  box-sizing: border-box;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`;