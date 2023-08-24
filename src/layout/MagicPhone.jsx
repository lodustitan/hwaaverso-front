import styled from "styled-components";
import { useContext } from "react";

import { CharacterContext } from "../containers/App";
import Menu from "../containers/Menu";
import PostiMagic from "../components/PostsiMagic";

const sentinelRanks = {
  0: 'Rank-F',
  1: 'Rank-E',
  2: 'Rank-D',
  3: 'Rank-C',
  4: 'Rank-B',
  5: 'Rank-A',
  6: 'Rank-S',
  7: 'Rank-SS',
  8: 'Rank-SSS',
}

export default function MagicPhone() {
  const { playerInfos } = useContext(CharacterContext);

  return (
    <>
      <Menu />
      <Body>
        {playerInfos && 
        <>
          <IMagicStatus>
            <div>
              {`${playerInfos.nickname} ${sentinelRanks[playerInfos.sentinelRank]}`}
            </div>
            <div>No Guild</div>
          </IMagicStatus>
          <IMagicInfos>
            <span>{playerInfos.fame.points} Fame</span>
            <span>{playerInfos.fame.followers} Followers</span>
            <span>{playerInfos.fame.engage} Happy</span>
          </IMagicInfos>
          <Label>Your Posts</Label>
          <IMagicPosts>
            <PostiMagic isCreator />
            <PostiMagic views={523} likes={21} />
            <PostiMagic views={623} likes={44} />
            <PostiMagic views={823} likes={25} />
            <PostiMagic views={412} likes={27} />
            <PostiMagic views={628} likes={33} />
            <PostiMagic views={1283} likes={82} />
            <PostiMagic views={99235} likes={2304} />
            <PostiMagic views={70} likes={12} />
            <PostiMagic views={5} likes={1} />
            <PostiMagic views={12} likes={1} />
            <PostiMagic views={62} likes={5} />
            <PostiMagic views={42} likes={4} />
          </IMagicPosts>
          <Label>Guild Contracts Network</Label>
          <GuildContracts>
            <GuildContractsGachaList>
              <GuildContractGacha>
                <span>Contract</span> 
                <span>100 Fame</span> 
              </GuildContractGacha>
              <GuildContractGacha>
                <span>Advanced Contract</span> 
                <span>450 Fame</span> 
              </GuildContractGacha>
              <GuildContractGacha>
                <span>Best Contract</span>
                <span>1100 Fame</span>   
              </GuildContractGacha>
            </GuildContractsGachaList>
            <GuildContractProposal>

            </GuildContractProposal>
          </GuildContracts>
        </>
      } 
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
const Label = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  font-weight: 300;
  height: 4rem;
  margin-top: 2rem;
`;

const IMagicStatus = styled.div`
  padding: 2rem 0;
`;
const IMagicInfos = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 0;
  border-top: 1px solid aliceblue;
  border-bottom: 1px solid aliceblue;
  justify-content: space-around;
  margin-bottom: 1rem;
`;
const IMagicPosts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 94%;
  height: 270px;
  min-height: 270px;
  overflow-y: auto;
  border: solid aliceblue;
  border-radius: 8px;
  background-color: #666;
`;


const GuildContracts = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 94%;
  height: 270px;
  min-height: 270px;
  overflow-y: auto;
  border: solid aliceblue;
  border-radius: 8px;
  background-color: #666;
`;
const GuildContractGacha = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100%/3);
  height: 64px;
  border-radius: 8px;
  border: solid aliceblue;
  background-color: #ad222e;
  span:nth-child(1) {
    font-weight: 600;
  }
  span:nth-child(2) {
    font-size: small;
    font-weight: 300;
  }
`;
const GuildContractProposal = styled.div`

`;
const GuildContractsGachaList = styled.div`
  width: 100%;
  height: calc(64px + 12px);
  background-color: #502427;
  display: flex;
  justify-content: center;
  align-items: center;
`;