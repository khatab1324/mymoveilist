import ShowMovie from '../components/showMovie';
import SearchInput from '../components/searchInput';
import { useFetchMovieQuery } from '../movieStore';
import ShowSideBar from '../components/showSideBar';
import SignInButton from '../components/signInButton';
import SingInForm from '../components/logInFrom';
import { Outlet, useLocation } from 'react-router-dom';
import { isUserSignIn, writeUsername, isSignInFormOpen } from '../movieStore';
import { useDispatch } from 'react-redux';

function Main() {
  const dispatch = useDispatch();
  const usernameSession = sessionStorage.getItem('username');
  console.log(usernameSession);
  if (usernameSession === null) {
    dispatch(isUserSignIn(false));
    dispatch(writeUsername(''));
  } else {
    dispatch(isUserSignIn(true));
    dispatch(writeUsername(usernameSession));
  }
  const location = useLocation();
  const isSignInPage = location.pathname === '/signin';
  isSignInPage && dispatch(isSignInFormOpen(true));
  !isSignInPage && dispatch(isSignInFormOpen(false));
  return (
    <div
      className={`overflow-auto h-screen h-full ${
        isSignInPage ? 'bg-slate-800  bg-opacity-75' : ''
      }`}
    >
      <Outlet />
      <div className="">
        <ShowSideBar />
        <SignInButton />
      </div>
      {/* <div>
        <div className="fixed inset-0 bg-gray-300 opacity-80"></div>
        <div className="fixed inset-40 p-10 bg-white">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-end"></div>
          </div>
        </div>
      </div> */}
      <div className="flex flex-col items-center justify-center mx-4 mt-20">
        <h1 className="text-3xl font-bold p-4">my movie list</h1>
        <SearchInput />
        <ShowMovie />
      </div>
    </div>
  );
}
export default Main;
