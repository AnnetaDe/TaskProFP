import { createSelector } from '@reduxjs/toolkit';

export const selectUserName = createSelector(state => state.user.username);
export const selectUserTheme = createSelector(state => state.user.theme);
export const selectAccessToken = createSelector(
  state => state.user.accessToken
);
export const selectRefreshToken = createSelector(
  state => state.user.refreshToken
);
export const selectIsLoggined = createSelector(state => state.user.isLoggined);
export const selectIsLoading = createSelector(state => state.user.isLoading);
export const selectIsRefreshing = createSelector(
  state => state.user.isRefreshing
);
export const selectAvatar = createSelector(state => state.user.avatar);
