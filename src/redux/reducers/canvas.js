import { ADD_CARD, REMOVE_CARD, EDIT_CARD } from '../actionTypes';

const initialState = {
    tiles: [],
    cards: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ADD_CARD: {
            const { id, body, tileId } = action.payload;
            return {
                ...state,
                tiles: initialState.tiles,
                
            }
        }
    }
}