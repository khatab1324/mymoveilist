import ShowMovie from "../components/showMovie";
import SearchInput from "../components/searchInput";
import { useFetchMovieQuery } from "../movieStore";
import ShowSideBar from "../components/showSideBar";
import SignInButton from "../components/signInButton";
import SingInForm from "../components/signInFrom";
import { Outlet } from "react-router-dom";
import ShowUsers from "../components/showUsers";
function Main() {
  return (
    <div>
      <div>  
        
        <ShowUsers/>
        <ShowSideBar/>   
        <Outlet/> 
        <SignInButton/>
        </div>
        <div className="flex flex-col items-center justify-center mx-4">
        <h1 className="text-3xl font-bold  p-4">my movie list</h1>
        <SearchInput />
        <ShowMovie />
      </div>
    </div>
  );
}
export default Main;