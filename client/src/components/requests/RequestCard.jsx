import React from 'react'
import styled from 'styled-components'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useRequestActions } from '../../hooks/useRequestActions';

function RequestCard({request}) {
    const { like, dislike } = useRequestActions(request);

  return (
    <Container>
        <div className="request-card">
            <h3>{request.name}</h3>
            <p>{request.location}</p>
            <p>Requested by: {request.player.name}</p>
            <div className="icon-group">
                <button className="request-like" onClick={like}>
                    <AiOutlineLike /> {request.likes}
                </button>
                <button className="request-dislike" onClick={dislike}>
                    <AiOutlineDislike /> {request.dislikes}
                </button>
            </div>
        </div>
    </Container>
  )
}

const Container = styled.div`
    .request-card {
        background-color: white;
        border-style: solid;
        border-radius: 10px;
        width: 13vw;
        height: 100%;
        text-align: center;
    }
    .icon-group{
        .request-like {
            font-size: 1.2rem;
            svg{
                color: green;
            }
        }
        .request-dislike {
            font-size: 1.2rem;
            svg{
                color: red;
            }
        }
    }
`;
export default React.memo(RequestCard);