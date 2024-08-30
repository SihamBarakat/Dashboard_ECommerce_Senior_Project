import React from "react";

const Header = ({ category, title2, title }) => (
  <div className=" mb-6 ">
    <div className="text-3xl font-extrabold tracking-tight text-slate-900 bg-white">
      <h4 color="black">{title} </h4>{" "}
      <h4 className="text-lg mr-11 text-gray-400">{category}</h4>
    </div>
  </div>
);

export default Header;
