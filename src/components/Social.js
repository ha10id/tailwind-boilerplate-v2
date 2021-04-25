import React from "react";
import wkImg from "../assets/images/3cdd200f5194.svg";
import okImg from "../assets/images/4f393a914308.svg";
import appleImg from "../assets/images/f31b3d53a354.svg";
import fbImg from "../assets/images/89c7d93b23ae.svg";
import googleImg from "../assets/images/a0a0fd5f488d.svg";

export const Social = () => {
  return (
    <div className="my-4 px-12 flex flex-row w-full justify-between">
      <button className="btn-round-white">
        <img src={wkImg} alt=""/>
      </button>
      <button className="btn-round-white">
        <img src={okImg} alt=""/>
      </button>
      <button className="btn-round-white">
        <img src={appleImg} alt=""/>
      </button>
      <button className="btn-round-white">
        <img src={fbImg} alt=""/>
      </button>
      <button className="btn-round-white">
        <img src={googleImg} alt=""/>
      </button>
    </div>
  );
};
