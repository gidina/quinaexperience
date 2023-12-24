import React from "react";
import { Link } from "react-router-dom";
import uuhquexunguLogo from "/uuhquexungu-logo.png";

const Header = () => {
  return (
    <div className="flex items-center gap-12 py-8">
      <Link to="/">
        <img src={uuhquexunguLogo} alt="Uuhquexungu logotip" className="h-24 transition-transform hover:scale-125 hover:cursor-pointer" />
      </Link>
      <h1 className="text-6xl">Uuhquinaexperience</h1>
    </div>
  );
};

export default Header;
