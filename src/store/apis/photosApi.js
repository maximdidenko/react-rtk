import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { faker } from '@faker-js/faker';

const photosApi = createApi({
  reducerPath: 'photos',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
  }),
  endpoints(builder) {
    return {
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, album) => {
          return [{ type: 'AlbumsPhotos', id: album.id }];
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'POST',
            body: {
              url: faker.image.abstract(150, 150, true),
              albumId: album.id,
            },
          };
        },
      }),
      removePhoto: builder.mutation({
        invalidatesTags: (results, error, photo) => {
          return [{ type: 'Photo', id: photo.id }];
        },
        query: (photo) => {
          return {
            url: `/photos/${photo.id}`,
            method: 'DELETE',
          };
        },
      }),
      fetchPhotos: builder.query({
        providesTags: (result, error, album) => {
          const tags = result.map((photo) => {
            return { type: 'Photo', id: photo.id };
          });

          return [{ type: 'AlbumsPhotos', id: album.id }, ...tags];
        },
        query: (album) => {
          return {
            url: '/photos',
            method: 'GET',
            params: {
              albumId: album.id,
            },
          };
        },
      }),
    };
  },
});

export { photosApi };

export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
