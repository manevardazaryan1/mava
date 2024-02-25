import { createSlice, current } from "@reduxjs/toolkit";
const initialState = {
  workspaces: [
    {id: "2024-02-12T11:38:35.515A", 
      img: {thumb: "https://images.unsplash.com/photo-1674673353738-dc8039354dd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc3Mzc5MDh8&ixlib=rb-4.0.3&q=80&w=200"},
      title: "w3",
      user: {
        email: "admin@gmail.com",
        id: 1,
        password: "admin",
        userName: "admin"
      }
    },
  {id: "2024-02-12T11:40:39.958A", 
    img: {thumb: "https://images.unsplash.com/photo-1591184209497-9237faf84714?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1NTAxMDl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MDc3MzgwMzF8&ixlib=rb-4.0.3&q=80&w=200"},
    title: "w4",
    user: {
      email: "admin@gmail.com",
      id: 1,
      password: "admin",
      userName: "admin"
      }
    }
  ],
  selectedImg: {
    thumb: ""
  },
  settingsOpened: false
};

export const workSpacesSlice = createSlice({
  name: "workspaces",
  initialState,
  reducers: {
    addWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map((workspace) => {
        return { ...workspace, active: false };
      });
      state.workspaces.unshift({
        id: action.payload.id,
        title: action.payload.title,
        img: action.payload.img,
        user: action.payload.user,
        active: action.payload.active,
        status: action.payload.status,
        count: action.payload.count,
      });
      // console.log(current(state).workspaces)
      // state.workspaces = [action.payload, ...state.workspaces]
    },
    workspaceCreationBoxHandle: (state, action) => {
      state.creationBox = action.payload.val;
    },
    selectWorkspaceImg: (state, action) => {
      state.selectedImg.thumb = action.payload.thumb;
    },
    toggleActiveWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map((workspace) => {
        if (workspace.id === action.payload.id) {
          return { ...workspace, active: true };
        } else return { ...workspace, active: false };
      });
    },
    deleteActiveWorkspace: (state, action) => {
      state.workspaces = state.workspaces.map((workspace) => {
        return { ...workspace, active: false };
      });
    },

    openSettings: (state, action) => {
      state.settingsOpened = true;
    },
    closeSettings: (state, action) => {
      state.settingsOpened = false;
    },
    changeTitle: (state, action) => {
      const workSpaceToChange = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToChange.title = action.payload.newTitle;
    },
    changeIcon: (state, action) => {
      const workSpaceToChange = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToChange.img.thumb = action.payload.thumb
    },
    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(workspace => workspace.id !== action.payload.id)
    },
    activateProStatus: (state, action) => {
      const workSpaceToActivate = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToActivate.status = 'Pro';
    },
    remainingDecr: (state, action) => {
      const workSpaceToDecr = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToDecr.count -= 1;
    },
    remainingInc: (state, action) => {
      const workSpaceToInc = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToInc.count += 1;
    },
    changeCount: (state, action) => {
      const workSpaceToChange = state.workspaces.find(workspace => workspace.id === action.payload.id);
      workSpaceToChange.count-=action.payload.count;
    }
  }
});
export const {
  addWorkspace,
  selectWorkspaceImg,
  toggleActiveWorkspace,
  deleteActiveWorkspace,
  openSettings,
  changeTitle,
  changeIcon,
  deleteWorkspace,
  closeSettings,
  activateProStatus,
  remainingInc,
  remainingDecr,
  changeCount
} = workSpacesSlice.actions;
export default workSpacesSlice.reducer;
