import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { UserBar } from "./UserBar";

export const Navbar = (props) => {
    const { authUser } = useAuth();
    const queryPage = useLocation();
    const testPath = (path) => {
        return queryPage.pathname === path.slice(1);
    };
    const menu = [
        {
            id: 0,
            title: "Главная",
            path: "#/"
        },
        {
            id: 1,
            title: "Файлы",
            path: "#/files"
        }
    ]
    return (
        <nav>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        {menu.map((item) => (
                                <a key={`nav-item-${item.id}`}
                                   href={item.path}
                                   className={testPath(item.path) ? "nav-item-active" : "nav-item"}
                                   aria-current="page">{item.title}</a>
                            )
                        )}
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* {authUser && <Notification/>} */}

                        {!authUser ? (<div className="ml-3">
                                <a href="#/signin"
                                   className={testPath("#/signin") ? "nav-item-active" : "nav-item"}
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
