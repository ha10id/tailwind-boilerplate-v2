import React from 'react';

export const Panel = (props) => {
    return (
        <div className="pt-3 relative">
            <p className="px-3 absolute left-5 top-0 bg-white font-semibold text-blue-800">{props ? props.title: null}</p>
            <div className="p-3 border border-solid border-gray-400 text-left flex flex-col">
                {props ? props.children : null}
            </div>
        </div>
    );
};

