import { ADD_CARD, EDIT_CARD, REMOVE_CARD } from './actionTypes';

export const addCard = (body, tileId) =>  ({
    type: ADD_CARD,
    payload: {
        body,
        tileId
    }
});

export const editCard = (cardId, body, tileId) => ({
    type: EDIT_CARD,
    payload: {
        cardId,
        body,
        tileId,
    }
});

export const removeCard = (cardId, tileId) => ({
    type: REMOVE_CARD,
    payload: {
        cardId,
        tileId
    }
});