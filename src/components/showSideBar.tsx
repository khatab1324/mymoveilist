import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
export default function ShowSideBar() {
  const [expandSideBar, setExpandSideBar] = useState(false);
  return (
    <div>
      {expandSideBar ? (
        <div className="">
          <aside className="fixed inset-0 bg-slate-600 h-screen w-1/6 ">
            <div className=" text-base ">
              <h1 className="text-gray-400 p-3 text-lg">
                <Link to={'/'}>home page</Link>
              </h1>
              <button
                className=" text-2xl text-gray-300 hover:text-gray-500 absolute top-2.5 end-2.5 "
                onClick={() => setExpandSideBar(!expandSideBar)}
              >
                <TiDelete />
              </button>
            </div>
            <div className="flex justify-center">
              <div className="flex flex-col">
                <div>
                  <Link to={'/movies'}>your movies</Link>
                </div>
                <div>
                  <Link to={'/wishList'}>your wishlist</Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      ) : (
        <button
          className="p-3"
          onClick={() => setExpandSideBar(!expandSideBar)}
        >
          <FaBars />
        </button>
      )}
    </div>
  );
}
