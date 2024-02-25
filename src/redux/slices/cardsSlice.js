import { createSlice } from '@reduxjs/toolkit';

const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    "1708071130577": [
        {
            "id": "1708071483141",
            "text": "xzcbvcvb"
        },
        {
            "id": "1708071481801",
            "text": "dfgdfg"
        },
        {
            "text": "dfnadfh",
            "id": "1708071484981"
        }
    ],

    "1708071130599": [
      {
          "id": "1708071483145",
          "text": "xzcfsfsbvcvb"
      },
      {
          "id": "1708071481805",
          "text": "dfgdfffg"
      },
      {
          "text": "dfnsfsadfh",
          "id": "1708071484982"
      }
    ],
  },
  reducers: {
    addCard: (state, action) => {
      const { listId, card } = action.payload;
      if (!state[listId]) {
        state[listId] = [];
      }
      state[listId].push(card);
    },
    removeCard: (state, action) => {
        const { listId, cardId } = action.payload;
        if (state[listId]) {
          state[listId] = state[listId].filter(card => card.id !== cardId);
        }
    },
    updateCardOrder: (state, action) => {
      const { listId, updatedCards } = action.payload;
      state[listId] = updatedCards;
    },
  },
});

export const { addCard, removeCard, updateCardOrder } = cardsSlice.actions;
export default cardsSlice.reducer;
