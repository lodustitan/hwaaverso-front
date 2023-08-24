import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import Menu from '../containers/Menu';
import EnemyClicker from '../components/EnemyClicker';
import { CharacterContext } from '../containers/App';
import RewardBattle from '../components/RewardBattle';
import randomNumbers from '../utils/randomNumbers';

export default function Battle() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const playerContext = useContext(CharacterContext);
  const [enemy, setEnemy] = useState();
  const [enemyAlive, setEnemyAlive] = useState(true);
  const [rewards, setRewards] = useState({loot: [], resources: 0});

  const setEnemyData = async (health, sprite, name, resource, lootList) => {
    const form = {
      health: [health, health],
      name: name,
      exp: 0,
      resource: resource,
      loot: lootList,
      sprite: `${import.meta.env.VITE_API_URL}/sprites${sprite}`,
    }
    setEnemy(form);
  }
  const newRandomMonster = async () => {
    const state = location.state.monster;
      if(!state) { navigate('/map') }
      else {
        const monsterResources = randomNumbers(state.rewards.resources[0], state.rewards.resources[1]);
        await setEnemyData(state.status.health, state.sprite, state.name, monsterResources, state.loot);
        setEnemyAlive(true);
      }
  }

  useEffect(() => {
    const fetch = async () => { 
      await newRandomMonster();
    }
    fetch()
  }, []);


  
  return (
    <>
      <Menu />
      <Body>
          {enemy &&
          <>
            <Status>
              <Box sx={{ color: '#d44646', width: '100%' }}>
                <LinearProgress variant="determinate" 
                  value={(enemy.health[0] / enemy.health[1])*100}
                  color="inherit"
                  sx={{
                    height: '40px',
                    borderRadius: '8px',
                    border: 'solid black',
                }} />
              </Box>
            </Status>
            <Content>
              {enemyAlive ? 
                <>
                  <EnemyName>{enemy.name}</EnemyName>
                  <EnemyClicker 
                    sprite={enemy.sprite} 
                    enemy={enemy} 
                    setEnemy={setEnemy}
                    setEnemyAlive={setEnemyAlive}
                    setRewards={setRewards}
                  />
                </>:
                <>
                  <RewardBattle 
                    newRandomMonster={newRandomMonster} 
                    rewards={rewards}
                  />
                </> 
            }
            </Content>
          </>}
          {playerContext &&
            <Status>
              <Box sx={{ color: '#d44646', width: '100%' }}>
                <LinearProgress variant="determinate" 
                  value={(playerContext.playerInfos.body.health[0] / playerContext.playerInfos.body.health[1]) *100}
                  color="inherit"
                  sx={{
                    height: '40px',
                    borderRadius: '4px',
                    border: 'solid black',
                  }} />
              </Box>
              <Box sx={{ color: '#468fd4', width: '100%' }}>
                <LinearProgress variant="determinate" 
                  value={(playerContext.playerInfos.body.mana[0] / playerContext.playerInfos.body.mana[1]) *100}
                  color="inherit"
                  sx={{
                    height: '20px',
                    borderRadius: '4px',
                    border: 'solid black',
                  }} />
              </Box>
              <Box sx={{ color: '#b7f04e', width: '100%' }}>
                <LinearProgress variant="determinate" 
                  value={(playerContext.playerInfos.exp / 1000) *100}
                  color="inherit"
                  sx={{
                    height: '10px',
                    borderRadius: '10px',
                    border: 'solid black',
                  }} />
              </Box>
            </Status>}
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
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: darkmagenta;
`;
const Status = styled.div`
  width: 100%;
`;
const EnemyName = styled.div`
  font-size: xx-large;
  font-weight: 900;
  -webkit-text-stroke: 2px black;
`;