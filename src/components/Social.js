import React from "react";
import wkImg from "../assets/images/3cdd200f5194.svg";
import okImg from "../assets/images/4f393a914308.svg";
import fbImg from "../assets/images/89c7d93b23ae.svg";
import googleImg from "../assets/images/a0a0fd5f488d.svg";
import appleImg from "../assets/images/f31b3d53a354.svg";

export const Social = (props) => {
    return (
        <div className="my-4 px-12 flex flex-wrap flex-row w-full justify-between">
            <button
                className="button-round-white"
                onClick={() => props.action ? props.action("vk") : {}}>
                <img src={wkImg} alt=""/>
            </button>
            <button
                className="button-round-white"
                onClick={() => props.action ? props.action("ok") : {}}>
                <img src={okImg} alt=""/>
            </button>
            <button
                className="button-round-white"
                onClick={() => props.action ? props.action("apple") : {}}>
                <img src={appleImg} alt=""/>
            </button>
            <button
                className="button-round-white"
                onClick={() => props.action ? props.action("fb") : {}}>
                <img src={fbImg} alt=""/>
            </button>
            <button
                className="button-round-white"
                onClick={() => props.action ? props.action("google") : {}}>
                <img src={googleImg} alt=""/>
            </button>
        </div>
    );
};
