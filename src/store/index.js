import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';
import { fetchUsers } from './thunks/fetchUsers';
import { addUser } from './thunks/addUser';
import { deleteUser } from './thunks/deleteUser';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
  albumsApi,
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} from './apis/albumsApi';
import {
  photosApi,
  useAddPhotoMutation,
  useRemovePhotoMutation,
  useFetchPhotosQuery,
} from './apis/photosApi';

const store = configureStore({
  reducer: {
    users: usersReducer,
    [albumsApi.reducerPath]: albumsApi.reducer,
    [photosApi.reducerPath]: photosApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(albumsApi.middleware)
      .concat(photosApi.middleware);
  },
});

setupListeners(store.dispatch);

export {
  store,
  fetchUsers,
  addUser,
  deleteUser,
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
};
