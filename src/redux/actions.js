import { ADD_CARD, EDIT_CARD, REMOVE_CARD } from './actionTypes';

let nextCardId = 0;

export const addCard = (body, tileId) =>  ({
    type: ADD_CARD,
    payload: {
        id: ++nextCardId,
        body,
        tileId
    }
});

export const editCard = (cardId, body, tileId) => ({
    type: EDIT_CARD,
    payload: {
        id: cardId,
        body,
        tileId,
    }
});

export const removeCard = (cardId, tileId) => ({
    type: REMOVE_CARD,
    payload: {
        id: cardId,
        tileId
    }
});