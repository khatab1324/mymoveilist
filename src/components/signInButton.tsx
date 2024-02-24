import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function SignInButton() {
  const [slideDown, setSlideDown] = useState(false);
  const nameUsername = useSelector((state: any) => state.signIn.username);
  const isSignInFormOpen = useSelector(
    (state): any => state.signIn.isSignInFromOpen
  );
  return (
    <div>
      {!nameUsername ? (
        <Link to={'/signin'}>
          <button
            className={
              isSignInFormOpen
                ? `$  bg-gradient-to-r from-cyan-300 to-slate-600 to-slate-100 py-2.5 px-4 rounded-xl absolute top-2 end-2 hover:bg-gray-300 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer`
                : ' bg-gradient-to-r from-slate-300 to-cyan-600 py-2.5 px-4 rounded-xl absolute top-2 end-2 hover:bg-gray-300 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer'
            }
          >
            signIn ^_^
          </button>
        </Link>
      ) : (
        <div className="absolute top-2 end-2">
          <div
            className=" text-white py-2.5 px-5   hover:text-blue-300 hover:translate-x-1 transition ease-in-out delay-150"
            onClick={() => setSlideDown(!slideDown)}
          >
            {nameUsername}
          </div>
          <div className="px-6">
            {slideDown && (
              <div className=" w-24 rounded-lg flex flex-col justify-center bg-slate-600 bg-opacity-90">
                <p className="text-blue-400 p-2 hover:text-gray-50 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer">
                  account
                </p>
                <Link to={'/logout'}>
                  <p className="text-blue-400 p-2 hover:text-gray-50 hover:translate-x-1 transition ease-in-out delay-150 cursor-pointer">
                    logOut
                  </p>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
