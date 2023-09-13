import { useDispatch } from "react-redux";
import { updateRequestLikes, updateRequestDislikes } from "../redux/requests/requestsSlice";


export const useRequestActions = (request) => {
    const dispatch = useDispatch();
    const id = request.id


    const like = () => {
        dispatch(updateRequestLikes({likes: request.likes + 1, id}));
    };

    const dislike = () => {
        dispatch(updateRequestDislikes({dislikes: request.dislikes + 1, id}));
    };

    return { like, dislike }
    ;
}