import {Form,redirect, useNavigate } from "react-router-dom"
import { useAddUserMutation, useFetchusersQuery } from "../movieStore";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


function SingInForm(){
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const[addUser,addUserResult]= useAddUserMutation()
    const handleSubmit = async (event:any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password=formData.get("password")
        // TODO: //hash the password 
        const user={username,password};
        addUser(user);
        navigate("/") 
    };
    
    

    return<div>
        <Form method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">username</label>
        <input type="text" name="username" id="username"/>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password"/>
        <button type="submit">Sign In</button>
        </Form>
        </div>
}
export default SingInForm