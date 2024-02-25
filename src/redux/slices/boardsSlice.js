import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  boards: [
    {
      id: "2024-02-15T15:11:09.063A",
      img: {
          bigImg: "https://images.unsplash.com/photo-1519515533456-ed9f2c73ca33?ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgwMDk4Njd8&ixlib=rb-4.0.3",
          thumb: "https://images.unsplash.com/photo-1519515533456-ed9f2c73ca33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDgwMDk4Njd8&ixlib=rb-4.0.3&q=80&w=1080",
      },

      title: "1",

      workspace: {
          active: true,
          id: "2024-02-12T11:38:35.515A",
          img: {
              thumb: "https://images.unsplash.com/photo-1674673353738-dc8039354dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc3Mzc5MDh8&ixlib=rb-4.0.3&q=80&w=200"
          },
          title: "w3",
      },

      user: {
          email: "admin@gmail.com",
          id: 1,
          password: "admin",
          userName: "admin",

      }
    }
  ],
  selectedImg: {
    thumb: '',
    bigImg: '',
  },
}

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addBoard: (state, action) => {
      // state.boards.push({ id: action.payload.id, title: action.payload.title, img: action.payload.img, workspace: action.payload.workspace })
      state.boards.push(action.payload)
    },

    selectBoardImg: (state, action) => {
      state.selectedImg.thumb = action.payload.regular;
      state.selectedImg.bigImg = action.payload.raw;
    },
    deleteBoard: (state, action) => {
      state.boards = state.boards.filter(board => board.id !== action.payload.id)
    },
    editBoard: (state, action) => {
      const boardToChange = state.boards.find(board => board.id === action.payload.id);
      boardToChange.title = action.payload.title

    }
  }
})


export const { addBoard, selectBoardImg, deleteBoard, editBoard } = boardsSlice.actions
export default boardsSlice.reducer