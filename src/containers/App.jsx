import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import './App.css'

import Novel from '../layout/Novel';
import Home from "../layout/Home";
import Battle from "../layout/Battle";
import Map from "../layout/Map";
import MagicPhone from "../layout/MagicPhone";
import Backpack from "../layout/Backpack";
import apiDatabase from "../api/apiDatabase";
import Craft from "../layout/Craft";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/story", element: <Novel /> },
  { path: "/battle", element: <Battle /> },
  { path: "/map", element: <Map /> },
  { path: "/imagic", element: <MagicPhone /> },
  { path: "/inventory", element: <Backpack /> },
  { path: "/craft", element: <Craft /> },
]);

export const CharacterContext = createContext(null);

export default function App() {
  const [playerInfos, setPlayerInfos] = useState();
  useEffect(() => {
    async function fetchData() {
      const dataPlayer = await apiDatabase.getCharacter();
      if(!dataPlayer) {
        apiDatabase.createCharacter({
          nickname: "TestPlayer@27302",
          gwans: 0,
          resources: 0,
          hwaaPoints: 100,
          exp: 0,
          sentinelRank: 0,
          equip: {
            outfit: null,
            weapon: null,
            aura: null,
            acessory: null
          },
          stats: { strength: 4, intellect: 4, react: 4 },
          body: { health: [10, 10], mana: [15, 15] },
          fame: { points: 0, followers: 0, engage: 0 },
        })
        setPlayerInfos(apiDatabase.getCharacter());
      } else {
        setPlayerInfos(dataPlayer);
      }
    }
    fetchData();
    
  }, [])
  
  
  return (
    <>
      {playerInfos ? 
      <CharacterContext.Provider value={{playerInfos, setPlayerInfos}}>
        <RouterProvider router={router} />
      </CharacterContext.Provider>
      : "Now Loading..."}
    </>
  )
}


