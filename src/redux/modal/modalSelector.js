export const selectModal = state => state.modal.isOpen;
export const selectEditProfileModal = state => state.modal.isEditProfile;
export const selectCreateBoardModal = state => state.modal.isCreateBoardOpen;
export const selectResendVerifyEmailModal = state =>
  state.modal.isResendVerifyEmailOpen;
export const selectNeedHelpModal = state => state.modal.isNeedHelpOpen;
