import React from "react";

export const NotFound = () => {
    return (
        <div className="page-404 relative">
            <div className="absolute bottom-12 left-0 flex flex-col items-center justify-between text-center w-full">
                <p>Упс! Что-то пошло не так...</p>
                <a href="/" className="w-full font-medium text-green-400 hover:text-green-600 pb-3">
                    Вернуться на главную страницу
                </a>
            </div>
        </div>
    );
};
