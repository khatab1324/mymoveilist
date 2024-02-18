import SingInForm  from "./components/signInFrom";
import ErrorPage from "./pages/errorPage";
import Main from "./pages/main";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  const router=createBrowserRouter([
    {
      path:"/",
      element:<Main/>,
      errorElement:<ErrorPage/>,
      children:[
        {
          path:"/signin",
          element:<SingInForm/>,
         
        },
      ]
    }
  ])
  return (
    <div className="h-screen h-full bg-gradient-to-r from-cyan-300 to-slate-600">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;