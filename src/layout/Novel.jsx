import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Menu from '../containers/Menu';
import Background from '../components/Background';
import Character from '../components/Character';
import DialogueBox from '../components/DialogueBox';
import Choices from '../components/Choices';
import { apiStory } from '../api/apiStory';

const apiSprite = `${import.meta.env.VITE_API_URL}/sprites`

export default function Novel () {
  const [dialogue, setDialogue] = useState();
  const [dialogueSequence, setDialogueSequence] = useState(0);
  const [choices, setChoices] = useState();
  const [scenes, setScenes] = useState ({
    background: null,
    speaker: null,
  })

  useEffect(() => {
    getStoryById(1, 1, 1);
  }, []);

  const nextSequence = () => {
    if(dialogueSequence < dialogue.textSequence.length -1) {
      setDialogueSequence(dialogueSequence + 1);
    }
  }
  const getStoryById = (storyId, id, route) => {
    apiStory.getStory(storyId, id, route)
    .then(el => {
      const data = el.data
      setDialogue(data);
      setChoices(data.choices);      
      setDialogueSequence(0);
      if(scenes.background !== data.background) { 
        setScenes({...scenes, background: data.background});
      };
      if(data.textSequence[dialogueSequence].speakerInfo) { 
        if(data.textSequence[dialogueSequence].speakerInfo.animation !== scenes.speaker) {
          setScenes({...scenes, speaker: data.textSequence[dialogueSequence].speakerInfo.animation});
          
        }
      };
    });
  }
  const doAction = (act, value) => {
    const actions = {
      goto_dialogue_id: (value) => {
        getStoryById(1, value, 1);
      }
    }

    if(actions[act]) {
      actions[act](value);
      setChoices();
    }
  }

  return (
    <>
      <Menu />
      <Body>
        {scenes.background &&
          <Background image={`${apiSprite}${scenes.background}`} />
        }
        {scenes.speaker && 
          <Character sprite={`${apiSprite}${scenes.speaker}`} />
        }
        {dialogue && 
          <DialogueBox onClick={nextSequence} characterName={dialogue.textSequence[dialogueSequence].speakerInfo?.name} text={dialogue.textSequence[dialogueSequence].text} />
        }
        {(choices &&  (dialogue.textSequence.length-1 === dialogueSequence)) && 
          <Choices action={doAction} listChoices={choices} />
        }
      </Body>
    </>
  )
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