import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isEditProfile: false,
    isCreateBoardOpen: false,
    isResendVerifyEmailOpen: false,
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
    openResendVerifyEmailModal: state => {
      state.isResendVerifyEmailOpen = true;
    },
    closeResendVerifyEmailModal: state => {
      state.isResendVerifyEmailOpen = false;
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
  openResendVerifyEmailModal,
  closeResendVerifyEmailModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
