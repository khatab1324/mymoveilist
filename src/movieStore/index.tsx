import { configureStore } from "@reduxjs/toolkit";
import { movieReducer, writeInSearchInput } from "./slice/sliceMovie";
import { useFetchMovieQuery } from "./api/movieApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApi } from "./api/movieApi";
const store = configureStore({
  reducer: {
    movies: movieReducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware),
});
setupListeners(store.dispatch);
export { useFetchMovieQuery } from "./api/movieApi";
export { store };
export { writeInSearchInput,addToMovieThatUserClickedFromSearchBar } from "./slice/sliceMovie";