import SingInForm from './components/singInForm';
import ErrorPage from './pages/errorPage';
import Main from './pages/main';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import MoviePage from './pages/movies';
import WishList from './pages/wishlist';
import LogOut from './components/logOut';
import LogInForm from './components/logInFrom';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/signin',
          element: <SingInForm />,
        },
      ],
    },
    {
      path: '/movies',
      element: <MoviePage />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/wishlist',
      element: <WishList />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/logout',
      element: <LogOut />,
      errorElement: <ErrorPage />,
    },
    {
      path: '/login',
      element: <LogInForm />,
      errorElement: <ErrorPage />,
    },
  ]);
  return (
    <div className=" min-h-screen bg-gradient-to-r from-cyan-300 to-slate-600">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
