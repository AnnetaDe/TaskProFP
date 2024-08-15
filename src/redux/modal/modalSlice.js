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
    isEditTaskOpen: false,
    isEditColumnOpen: {},
    isCreateColumnOpen: false,
    isCreateTaskOpen: false,
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
    openEditTaskModal: state => {
      state.isEditTaskOpen = true;
    },
    closeEditTaskModal: state => {
      state.isEditTaskOpen = false;
    },
    openEditColumnModal: (state, action) => {
      state.isEditColumnOpen[action.payload] = true;
    },
    closeEditColumnModal: (state, action) => {
      state.isEditColumnOpen[action.payload] = false;
    },
    openCreateColumnModal: state => {
      state.isCreateColumnOpen = true;
    },
    closeCreateColumnModal: state => {
      state.isCreateColumnOpen = false;
    },
    openCreateTaskModal:  (state, action) => {
      console.log(action);
      
      state.isCreateTaskOpen[action.payload] = true;
    },
    closeCreateTaskModal:  (state, action) => {
      state.isCreateTaskOpen[action.payload] = false;
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
  openEditTaskModal,
  closeEditTaskModal,
  openEditColumnModal,
  closeEditColumnModal,
  openCreateColumnModal,
  closeCreateColumnModal,
  openCreateTaskModal,
  closeCreateTaskModal
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
