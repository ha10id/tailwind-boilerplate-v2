import React from "react";
import {useLocation} from "react-router-dom";
import { UserBar } from "./UserBar";
import {useAuth} from "../../context/auth";


export const Navbar = (props) => {
  // const [menuHidden, setMenuHidden] = useState(true);
  const {authUser} = useAuth();
  const queryPage = useLocation();
  
  // if (authUser) {
  //   console.log(authUser);
  // }

  const testPath = (path) => {
    return queryPage.pathname === path;
  };

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#/"
               className={testPath("/") ? "nav-item-active" : "nav-item"}
               aria-current="page">Главная</a>
            <a href="#/files"
               className={testPath("/files") ? "nav-item-active" : "nav-item"}
               aria-current="page">Файлы</a>
          </div>

          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* {authUser && <Notification/>} */}

            {!authUser ? (<div className="ml-3">
                <a href="#/signin"
                   className={testPath("/signin") ? "nav-item-active" : "nav-item"}
                   aria-current="page">Вход</a>
              </div>) :
              (<div className="relative inline-block text-left">
                <UserBar authUser={authUser}/>
              </div>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};