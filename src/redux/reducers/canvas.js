import { ADD_CARD, REMOVE_CARD, EDIT_CARD } from '../actionTypes';

const initialState = {
    name: 'Meu Canvas',
    type: 'business_model_canvas',
    tiles: [
        {
            id: 'BMC_PARCERIAS',
            title: 'Parcerias Principais',
            size: 'is-one-quarter',
            cards: [
                {
                    content: 'Lorem Ipsum Dolor Sit Amet'
                },
                {
                    content: 'Viajando pra Brasilia'
                }
            ]
        },
        {
            id: 'BMC_ATIVIDADES',
            title: 'Atividades Principais',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_RECURSOS',
            title: 'Recursos Principais',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_VALOR',
            title: 'Proposta de Valor',
            size: 'is-one-quarter',
            cards: []
        },
        {
            id: 'BMC_RELACIONAMENTO',
            title: 'Relacionamento com Clientes',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_CANAIS',
            title: 'Canais',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_SEGMENTOS',
            title: 'Segmentos de Clientes',
            size: 'is-one-third',
            cards: []
        },
        {
            id: 'BMC_CUSTOS',
            title: 'Estrutura de Custos',
            size: 'is-half',
            cards: []
        },
        {
            id: 'BMC_RECEITA',
            title: 'Fontes de Receita',
            size: 'is-half',
            cards: []
        }
    ]
};

export default function(state = initialState, action) {
    if (action.type === ADD_CARD) {
        let newState = state;        
        const { body, tileId } = action.payload;
        newState.tiles[tileId].cards.push({ content: body });
        return {...newState};
    } else if (action.type === EDIT_CARD) {
        let newState = state;
        const { cardId, body, tileId } = action.payload;        
        newState.tiles[tileId].cards[cardId].content = body;
        return {...newState};
    } else if (action.type === REMOVE_CARD) {
        let newState = state;
        const { cardId, tileId } = action.payload;
        newState.tiles[tileId].cards.splice(cardId, 1);
        return {...newState};
    }
    return state;
}