import { configureStore } from '@reduxjs/toolkit'
import sportsReducer from '../redux/sports/sportsSlice'
import locationsReducer from '../redux/locations/locationsSlice'
import fieldsReducer from '../redux/fields/fieldsSlice';
import meetUpsReducer from '../redux/meetUps/meetUpsSlice';
import playersReducer from '../redux/players/playersSlice';
import requestsReducer from '../redux/requests/requestsSlice';
import adminsReducer from '../redux/admin/adminsSlice';


export const store = configureStore({
    reducer: {
        admin: adminsReducer,
        players: playersReducer,
        sports: sportsReducer,
        fields: fieldsReducer,
        locations: locationsReducer,
        meetUps: meetUpsReducer,
        requests: requestsReducer
    }
});