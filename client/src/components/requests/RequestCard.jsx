import React from 'react'
import styled from 'styled-components'
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { updateRequestDislikes, updateRequestLikes } from '../../redux/requests/requestsSlice';

function RequestCard({request}) {
    const dispatch = useDispatch();
    const id = request.id;

    // like functionality
    const handleLikeRequest = () => {
        dispatch(updateRequestLikes({likes: request.likes + 1, id}));
    }
    // dislike functionality
    const handleDislikeRequest = () => {
        dispatch(updateRequestDislikes({dislikes: request.dislikes + 1, id}));
    }

  return (
    <Container>
        <div className="request-card">
            <h3>{request.name}</h3>
            <p>{request.location}</p>
            <p>Requested by: {request.player.name}</p>
            <div className="icon-group">
                <button className="request-like" onClick={() => handleLikeRequest(request.id)}>
                    <AiOutlineLike /> {request.likes}
                </button>
                <button className="request-dislike" onClick={() => handleDislikeRequest(request.id)}>
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
        width: 13rem;
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