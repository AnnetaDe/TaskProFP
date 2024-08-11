import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isEditProfile: false,
    isCreateBoardOpen: false,
  },
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
    openEditProfileModal: state => {
      state.isEditProfile = true;
    },
    closeEditProfileModal: state => {
      state.isEditProfile = false;
    },
    openCreateBoardModaal: state => {
      state.isCreateBoardOpen = true;
    },
    closeCreateBoardModaal: state => {
      state.isCreateBoardOpen = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  openEditProfileModal,
  closeEditProfileModal,
  openCreateBoardModaal,
  closeCreateBoardModaal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
