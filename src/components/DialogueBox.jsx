import { useState } from "react";
import styled from "styled-components"

export default function DialogueBox({ characterName, text, onClick }) {
    const [ dialogueText, setDialogueText ] = useState("");

    return (
        <Body onClick={onClick}>
            <CharacterName>{characterName}</CharacterName>
            <Text>{text}</Text>
        </Body>
    )
}

const Body = styled.div`
    position: absolute;
    bottom: 2rem;
    height: 30vh;
    width: 90vw;
    background-color: rgba(0,0,0, 0.7);
`;
const CharacterName = styled.div`
    width: 100%;
    padding: 1rem;
    text-align: start;
`;
const Text = styled.div`
    padding: 2rem;
`;