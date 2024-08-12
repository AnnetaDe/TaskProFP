import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isOpen: false,
    isEditProfileOpen: false,
    isCreateBoardOpen: false,
    isResendVerifyEmailOpen: false,
    isNeedHelpOpen: false,
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
    openResendVerifyEmailModal: state => {
      state.isResendVerifyEmailOpen = true;
    },
    closeResendVerifyEmailModal: state => {
      state.isResendVerifyEmailOpen = false;
    },
    openNeedHelpModal: state => {
      state.isNeedHelpOpen = true;
    },
    closeNeedHelpModal: state => {
      state.isNeedHelpOpen = false;
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
  openResendVerifyEmailModal,
  closeResendVerifyEmailModal,
  openNeedHelpModal,
  closeNeedHelpModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
