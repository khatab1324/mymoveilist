import { createSlice } from "@reduxjs/toolkit";
const signInSlice=createSlice({
    name:"signIn",
    initialState:{isSignInFromOpen:false,usernameInput:"",passwordInput:""},
    reducers:{
        assignSignInFormOpen(state){
            state.isSignInFromOpen=!state.isSignInFromOpen
        },
        writeInUsernameInput(state,action){
            state.usernameInput=action.payload
        },
        writeInPasswordInput(state,action){
            state.passwordInput=action.payload
        }
    }
})
export const signInReducer=signInSlice.reducer;
export const{assignSignInFormOpen,writeInPasswordInput,writeInUsernameInput}=signInSlice.actions