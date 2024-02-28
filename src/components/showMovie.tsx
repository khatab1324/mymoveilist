import { useSelector } from 'react-redux';
import { useAddUserMovieMutation } from '../movieStore';
function ShowMovie() {
  const [addUserMovie, addUserMovieResult] = useAddUserMovieMutation();
  const movieSelectMovie = useSelector(
    (state: any) => state.movies.movieThatUserClickedFromSearchBar
  );
  console.log(movieSelectMovie);

  const handleClickAddMovieToMovies = () => {
    const username = sessionStorage.getItem('username');
    const dataToSend = { movieSelectMovie, username };
    console.log(dataToSend);

    addUserMovie(dataToSend);
  };

  let renderMovie;
  if (Object.keys(movieSelectMovie).length === 0) {
    renderMovie = <div></div>;
  } else {
    renderMovie = (
      <div>
        <div className="flex flex-row shadow-md bg-slate-300 items-center">
          <div className="w-40">
            <img
              className="max-w-full h-auto p-4 rounded-3xl"
              src={movieSelectMovie.Poster}
              alt=""
            />
          </div>
          <div className="px-6  pb-2 flex flex-col">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              title:{movieSelectMovie.Title}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              year: {movieSelectMovie.Year}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              type: {movieSelectMovie.Type}
            </span>
          </div>
        </div>
        <div className="flex flex-row  justify-center shadow-md bg-slate-300">
          <div className="  ">
            <button
              className=" mr-10 p-4 p-3 w-20 bg-blue-400 border focus:bg-green-200 hover:bg-blue-300"
              onClick={handleClickAddMovieToMovies}
            >
              Add+
            </button>
            <button className="mx-2 p-4 p-3 w-20 bg-blue-400 border focus:bg-green-200 hover:bg-blue-300">
              wishlist
            </button>
          </div>
        </div>
      </div>
    );
  }
  return <div className="p-4">{renderMovie}</div>;
}
export default ShowMovie;
