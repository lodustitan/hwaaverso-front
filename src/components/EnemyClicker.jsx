import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { CharacterContext } from '../containers/App';
import { useLocation } from 'react-router-dom';
import randomNumbers from '../utils/randomNumbers';
import { apiItem } from '../api/apiItem';
import apiDatabase from '../api/apiDatabase';

export default function EnemyClicker({ sprite, enemy, setEnemyAlive, setEnemy, setRewards }) {
  const player = useContext(CharacterContext);
  const [canDamageHim, setCanDamageHim] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const intervalDamageMonsterId = setInterval(() => {
      enemy.health;
    }, 1000);

    return () => clearInterval(intervalDamageMonsterId);
  }, [])

  const calculateDamage = () => {
    const { playerInfos } = player;
    
    const playerStrength = playerInfos.stats.strength;
    const playerWeapon = playerInfos.equip.weapon.durability.damage[0];
    const damage = (playerWeapon * (playerStrength * 14)) / 100;
    const variableDamage = Math.random() + 0.7
    return Math.round(damage * variableDamage);
  }
  const verifyDeath = () => {
    if (enemy.health[0] <= 0) {
      setEnemyAlive(false);
      const listDrops = [];
      for (const el of location.state.monster.loot) {
        const rand = randomNumbers(1, 10000);
        if(rand <= el.chance) {
          const filteredEnemy = el;
          const count = randomNumbers(el.count[0], el.count[1]);
          filteredEnemy.count = count;
          listDrops.push(filteredEnemy);
        }
      }
      apiItem.getItemList(listDrops)
      .then(el => {
        const addResource = (player.playerInfos.resources + enemy.resource) | 0;
        const newPlayerSave = {...player.playerInfos, resources: addResource};
        player.setPlayerInfos(newPlayerSave)
        apiDatabase.saveCharacter(newPlayerSave);
        setRewards({loot: el.data, resources: enemy.resource});
        for (const ely of el.data) {
          apiDatabase.addItem(ely)
        }
      });
    }
  }
  const damageHim = () => {
    if(canDamageHim) {
      const hp = enemy.health[0] - calculateDamage();
      const hpFilter = hp < 0? 0: hp;

      setEnemy({...enemy, health: [hpFilter, enemy.health[1]]});
      verifyDeath()

      setCanDamageHim(false);
      setTimeout(() => {
        setCanDamageHim(true);
      }, 1000);
    }
  }

  return (
    <Body onClick={damageHim}>
      <img alt='' src={sprite} />
    </Body>
  );
}

const Body = styled.div`
  width: 300px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
`;