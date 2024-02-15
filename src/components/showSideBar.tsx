import { FaBars } from "react-icons/fa";
function ShowSideBar(){
    const handleClickShowSideBar=()=>{
        console.log("hi");
    }
    return( 
    <div className="p-3">
        <button onClick={handleClickShowSideBar}>
         <FaBars />
         </button>
    </div>)
}
export default ShowSideBar