import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const mysqlMoviesApi = createApi({
  reducerPath: 'mysqlMoviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3100',
  }),
  endpoints(builder) {
    return {
      fetchUserMovies: builder.query({
        providesTags: ['movies'],
        query: (username) => {
          return {
            url: `/getMovies/${username}`,
            method: 'GET',
          };
        },
      }),
      addUserMovie: builder.mutation({
        invalidatesTags: ['movies'],
        query: ({ movieSelectMovie, username }) => ({
          url: '/addmovie',
          method: 'POST',
          body: {
            movieSelectMovie,
            username,
          },
        }),
      }),
    };
  },
});
export const { useFetchUserMoviesQuery, useAddUserMovieMutation } =
  mysqlMoviesApi;
export { mysqlMoviesApi };
