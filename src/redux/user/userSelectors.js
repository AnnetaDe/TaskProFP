import { createSelector } from '@reduxjs/toolkit';

export const selectUserName = createSelector(state => state.user.username);
export const selectUserEmail = createSelector(state => state.user.theme);
export const selectToken = createSelector(state => state.token);
export const selectIsLoggined = createSelector(state => state.isLoggined);
export const selectIsLoading = createSelector(state => state.isLoading);
export const selectIsRefreshing = createSelector(state => state.isRefreshing);
export const selectAvatar = createSelector(state => state.user.avatar);
