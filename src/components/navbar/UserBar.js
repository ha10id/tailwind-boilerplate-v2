import React from "react";
import { Menu, Transition } from "@headlessui/react";

export const UserBar = (props) => {
    const {authUser}= props; 
    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
      };
    return (
        <Menu>
            {({ open }) => (
                <>
                    <Menu.Button
                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Открыть меню пользователя</span>
                        <img className="h-8 w-8 rounded-full"
                            src={authUser.avatar}
                            alt="" />
                    </Menu.Button>
                    <Transition
                        show={open}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            static
                            className="absolute text-right right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 shadow-lg outline-none"
                        >
                            <div className="px-4 py-3">
                             <p className="text-sm font-extrabold leading-5 text-gray-900">
                               {authUser.surname + " " + authUser.name}
                             </p>
                            </div>
                            <div className="py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#/profile"
                                            className={`${active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700"
                                                } flex justify-end w-full px-4 py-2 text-sm leading-5`}
                                        >
                                            Мой профиль
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#/setting"
                                            className={`${active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700"
                                                } flex justify-end w-full px-4 py-2 text-sm leading-5`}
                                        >
                                            Настройки
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            className={`${active
                                                    ? "bg-gray-100 text-gray-900"
                                                    : "text-gray-700"
                                                } flex justify-end w-full px-4 py-2 text-sm leading-5`}
                                            onClick={logout}
                                        >
                                            Выход
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}