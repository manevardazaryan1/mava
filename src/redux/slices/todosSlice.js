
import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [
    {
      boardId: "2024-02-15T15:11:09.063A",
      id: "1708071130577",
      position: 1,
      title: "list",
    },

    {
      boardId: "2024-02-15T15:11:09.063A",
      id: "1708071130599",
      position: 1,
      title: "list1",
    }
  ],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
    updateLists: (state, action) => {
      return action.payload;
    },
    addList: (state, action) => {
      state.push(action.payload);
    },
    removeList: (state, action) => {
      return state.filter((list) => list.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo, updateLists, addList, removeList } =
  todosSlice.actions;
export default todosSlice.reducer;
