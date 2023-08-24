import styled from "styled-components"

export default function Background({ image }) {
	return (
		<Body>
			<img src={image} />
		</Body>
	)
}

const Body = styled.div`
    position: absolute;
    top: 0; left: 0;
    img {
        object-fit: cover;
        width: 100%;
        height: 100%;
    }
`;