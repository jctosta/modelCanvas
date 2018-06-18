const context = {
  addCard: () => 'newCard',
  canvas: {
    id: 0,
    title: 'Blank Canvas',
    type: '',
    containers: [
      {
        id: 0,
        title: 'Key Partners',
        color: 'blue-canvas',
        description: '- Who are your key partners?\n- Who are your key suppliers?',
      },
    ],
    cards: [],
    isEmpty: true,
  },
};

export default context;
