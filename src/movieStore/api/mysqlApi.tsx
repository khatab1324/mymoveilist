import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { url } from "inspector";

const mysqlApi=createApi({
    reducerPath:"mysqlApi",
    baseQuery :fetchBaseQuery({
        baseUrl:"http://localhost:3100/"
    }),
    endpoints(builder){
        return{
    fetchusers:  builder.query({
      
        query: () => ({
            url: "/getData",
            method: "GET",
          }),
          refetchOnMountOrArgChange: true,
            
            
        }),
    addUser:builder.mutation({
       
        query:(user)=>{
            return {
                url:"/addUser",
                method:"POST",
                body:{
                    username:user.username,
                    password:user.password
                }
            }
        }
    })
    }
    },
})
export const {useFetchusersQuery,useAddUserMutation}=mysqlApi
export {mysqlApi}