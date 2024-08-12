import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isEditProfileOpen: false,
    isCreateBoardOpen: false,
    isEditBoardOpen: false,
  },
  reducers: {
    openModal: state => {
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
    openEditProfileModal: state => {
      state.isEditProfileOpen = true;
    },
    closeEditProfileModal: state => {
      state.isEditProfileOpen = false;
    },
    openCreateBoardModaal: state => {
      state.isCreateBoardOpen = true;
    },
    closeCreateBoardModaal: state => {
      state.isCreateBoardOpen = false;
    },
    openEditBoarModaal: state => {
      state.isEditBoardOpen = true;
    },
    closeEditBoardModaal: state => {
      state.isEditBoardOpen = false;
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
  openEditBoarModaal,
  closeEditBoardModaal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
