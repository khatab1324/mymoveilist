// https://www.omdbapi.com/?s=dark&apikey=1d057e15
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const keyApi = "1d057e15";
const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.omdbapi.com",
    
  },),
  endpoints(builder) {
    return {
      fetchMovie: builder.query({
        query: (inputSearchTitle) => {
          return {
            url: `/?s=${inputSearchTitle}&apikey=${keyApi}`,
            method: "GET",
         
          };
        },
      }),
      
    };
  },
});
export const { useFetchMovieQuery } = movieApi;
export { movieApi };
// quastions
// 1-what is fetchBaseQuery
// 2-whet is endpoints and builder