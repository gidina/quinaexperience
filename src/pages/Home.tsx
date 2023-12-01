import React, { FC, ReactElement } from "react";
import { Link } from "react-router-dom";
import { MdMovieCreation } from "react-icons/md";
import { PiMusicNotesFill } from "react-icons/pi";
import { FaBomb } from "react-icons/fa";
import { PiMicrophoneStageFill } from "react-icons/pi";
import { ImEvil2 } from "react-icons/im";
import { IconType } from "react-icons";

interface QuinaLink {
  to: string;
  title?: string;
  color: string;
  icon?: IconType;
  children?: ReactElement;
}
const QuinaLink: FC<QuinaLink> = ({ to, title, icon, color, children }) => {
  return (
    <Link
      to={to}
      className={`py-32 px-8 rounded-2xl text-8xl	no-underline text-black flex justify-center items-center gap-8 transition-transform hover:scale-105	hover:shadow-xl bg-[${color}]`}
    >
      <>
        {title} {icon && React.createElement(icon, { className: "h-16 w-16" })}
      </>
    </Link>
  );
};

const Home = () => {
  return (
    <div className="home grid grid-cols-2 py-16 gap-16">
      <QuinaLink
        to="hollywood"
        title="Hollywood"
        icon={MdMovieCreation}
        color="#F38181"
      />
      <QuinaLink
        to="explosiva"
        title="Explosiva"
        icon={FaBomb}
        color="#FCE38A"
      />
      <QuinaLink to="tongo" title="Tongo" icon={ImEvil2} color="#C5E898" />
      <QuinaLink
        to="cantada"
        title="Cantada"
        icon={PiMicrophoneStageFill}
        color="#95E1D3"
      />
      <QuinaLink
        to="musical"
        title="Musical"
        icon={PiMusicNotesFill}
        color="#FFCF96"
      />
    </div>
  );
};

export default Home;

/*
TODO
=======================================
Afegir què es canta i si ja s'ha cantat (Línia, Quina, > 1 Quina)
Mirar com queda amb la resolució de pantalla definitiva
Millorar estils
Auto-save? Permetre carregar dades desde LocalStorage?
*/
