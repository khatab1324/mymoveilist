import ShowMovie from "../components/showMovie";
import SearchInput from "../components/searchInput";
import { useFetchMovieQuery } from "../movieStore";
import ShowSideBar from "../components/showSideBar";

function Main() {
  
  return (
    <div>
      <ShowSideBar/>
      <div className="flex flex-col items-center justify-center mx-4">
        <h1 className="text-3xl font-bold  p-4">my movie list</h1>
        <SearchInput />
        <ShowMovie />
      </div>
    </div>
  );
}
export default Main;