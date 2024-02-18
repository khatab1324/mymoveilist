import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

function ShowSideBar(){
const [expandSideBar,setExpandSideBar]=useState(false)
    const handleClickShowSideBar=()=>{
     setExpandSideBar(!expandSideBar)
        console.log("hi");
    }
    let content
    if(expandSideBar){
        content=
        <aside className="fixed bg-slate-600 h-screen w-1/6 ">
        <div className=" text-base ">
        <h1 className="text-gray-400 p-3 text-lg">side bar</h1>
          <button className=" text-2xl text-gray-300 hover:text-gray-500 absolute top-2.5 end-2.5 " onClick={handleClickShowSideBar}> 
              <TiDelete/>
          </button>
        </div>
        <div className="flex justify-center">
            <div className="flex flex-col">
                <div>
                    <a href="" className="mt-5"> your movies</a>
                 </div>
                 <div>
                    <a href=""className="mt-5"> your wishlist</a>
                 </div>
           </div>
        </div>
      </aside>
    }else{
        content= 
        <button className="p-3" onClick={handleClickShowSideBar}>
        <FaBars />
        </button> 
    }
    return( 
    <div className=""> 
      {content}    
    </div>)
}
export default ShowSideBar