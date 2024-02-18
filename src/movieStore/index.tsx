import { configureStore } from "@reduxjs/toolkit";
import { movieReducer, writeInSearchInput } from "./slice/sliceMovie";
import { useFetchMovieQuery } from "./api/movieApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { movieApi } from "./api/movieApi";
import { signInReducer } from "./slice/sliceSignIn";
import { mysqlApi } from "./api/mysqlApi";
const store = configureStore({
  reducer: {
    movies: movieReducer,
    signIn:signInReducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [mysqlApi.reducerPath]:mysqlApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(movieApi.middleware).concat(mysqlApi.middleware),
});
setupListeners(store.dispatch);
export { useFetchMovieQuery } from "./api/movieApi";
export {useFetchusersQuery,useAddUserMutation} from "./api/mysqlApi"
export { store };
export { writeInSearchInput,addToMovieThatUserClickedFromSearchBar } from "./slice/sliceMovie";
export {assignSignInFormOpen,writeInPasswordInput,writeInUsernameInput} from "./slice/sliceSignIn"