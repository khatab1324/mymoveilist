import { writeInSearchInput,addToMovieThatUserClickedFromSearchBar } from "../movieStore";
import { useDispatch, useSelector } from "react-redux";
import { useFetchMovieQuery } from "../movieStore";
import { useState } from "react";

function SearchInput() {
  const dispatch = useDispatch();
  const movieInputValue = useSelector((state: any) => state.movies);
  const[searchBarOpen,setSearchBarOpen]=useState(false)
 
  const { data, error, isFetching }: any = useFetchMovieQuery(
    movieInputValue.searchInput
  );
  const handleChangeInput = (e: any) => {
    setSearchBarOpen(true)
    dispatch(writeInSearchInput(e.target.value));
  };
  const handleClickOnMovie=(id:any)=>{
    setSearchBarOpen(false);
    const movie= data.Search.find((movie:any)=>( movie.imdbID===id ))    
    dispatch(addToMovieThatUserClickedFromSearchBar(movie));
  }
  console.log(data);
  let content;
  if (isFetching) {
    content = "Loading...";
  } else if (error) {
    content = "There was an error: " + error.message;
  } else if (data.Search) {
    content = (
      <div className="overflow-auto h-72 relative max-w-sm mx-auto bg-white dark:bg-slate-700 dark:highlight-white/5 shadow-lg ring-1 ring-black/5 rounded-xl flex flex-col divide-y dark:divide-slate-200/5">
      {data.Search.map((item:any, index:any) => (
        <div
          key={item.imdbID}
          onClick={() => handleClickOnMovie(item.imdbID)}
          className="flex p-2 cursor-pointer hover:bg-gray-200 transition flex items-center gap-4 p-4"
        >
          <img src={item.Poster} className="w-1/6 h-20 mr-2 rounded-md" alt=""/>
          {item.Title}
        </div>
      ))}
    </div>
    );
  } else {
    content = "No results found";
  }
  return (
    <div>
      <input
        type="text"
        value={movieInputValue.searchInput}
        onChange={handleChangeInput}
        className="text-gray-900 border-gray-100 bg-gray-200 text-center w-96 h-12 rounded-md border border-gray-300 rounded-md focus:outline-none  focus:shadow-outline focus:border-gray-400 transition duration-200 ease-in-out  focus:placeholder-transparent "
        // className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="search movie"
      />
      <h3>{searchBarOpen&&content}</h3>
    </div>
  );
}
export default SearchInput;