import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CryptoJS from "crypto-js";

import boardsSlice from "./boardsSlice";
import cardModalSlice from "./cardModalSlice";
import cardsSlice from "./cardsSlice";
import creationBoxSlice from "./creationBoxSlice";
import todosSlice from "./todosSlice";
import workspacesSlice from "./workspacesSlice";

const initialState = {
  loggedIn: false,
  users: [],
  loggedUser: {}
};

export const uploadUserImage = createAsyncThunk(
  "authentication/uploadUserImage",
  async (imageFile, { getState }) => {
    const imageUrl = URL.createObjectURL(imageFile);
    return imageUrl;
  }
);

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.users = [...state.users, action.payload];
    },

    login: (state, action) => {
      state.loggedIn = true;
      state.loggedUser = action.payload;
      window.localStorage.setItem("isLoggedIn", "ON");
      window.localStorage.setItem("loggedUser", JSON.stringify(action.payload));
    },

    logOut: (state) => {
      state.loggedIn = false;
      state.loggedUser = {};
      window.localStorage.setItem("isLoggedIn", "OFF");
      window.localStorage.removeItem("loggedUser");
      boardsSlice.initialState = {};
      cardModalSlice.initialState = {};
      cardsSlice.initialState = {};
      creationBoxSlice.initialState = {};
      todosSlice.initialState = [];
      workspacesSlice.initialState = {};
    },

    updateUserImage: (state, action) => {
      const { userId, imageUrl } = action.payload;
      if (state.loggedUser && state.loggedUser.id === userId) {
        state.loggedUser.image = imageUrl;
      }
      const userIndex = state.users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].image = imageUrl;
      }
    },

    updatePassword: (state, action) => {
      const { userId, newPassword } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        user.password = CryptoJS.SHA256(newPassword).toString(CryptoJS.enc.Hex);
      }
    },

    updateUsername: (state, action) => {
      const { userId, newUsername } = action.payload;
      const userIndex = state.users.findIndex((u) => u.id === userId);
      if (userIndex !== -1) {
        state.users[userIndex].userName = newUsername;
        if (state.loggedUser.id === userId) {
          state.loggedUser.userName = newUsername;
        }
      }
    },

    deleteAccount: (state, action) => {
      const { userId } = action.payload;
      state.users = state.users.filter((u) => u.id !== userId);
      if (state.loggedUser.id === userId) {
        state.loggedIn = false;
        state.loggedUser = {};
        window.localStorage.setItem("isLoggedIn", "OFF");
        window.localStorage.removeItem("loggedUser");
      }
    },
    
    extraReducers: (builder) => {
      builder.addCase(uploadUserImage.fulfilled, (state, action) => {
        const userId = state.loggedUser.id;
        const imageUrl = action.payload;
        const user = state.users.find((u) => u.id === userId);
        if (user) {
          user.image = imageUrl;
        }
        if (state.loggedUser.id === userId) {
          state.loggedUser.image = imageUrl;
        }
      });
    }
  }
});

export const {
  signUp,
  login,
  logOut,
  updatePassword,
  updateUsername,
  deleteAccount,
  updateUserImage
} = authSlice.actions;

export default authSlice.reducer;
