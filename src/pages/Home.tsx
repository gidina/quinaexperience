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
  bgColor: string;
  icon?: IconType;
}

const QuinaLink: FC<QuinaLink> = ({ to, title, icon, bgColor }) => {
  return (
    <Link
      to={to}
      className={`py-32 px-8 rounded-2xl text-8xl no-underline text-black flex justify-center items-center gap-8 transition-transform hover:scale-105 hover:shadow-xl ${bgColor}`}
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
        bgColor="bg-[color:var(--color-hollywood)]"
      />
      <QuinaLink
        to="explosiva"
        title="Explosiva"
        icon={FaBomb}
        bgColor="bg-[color:var(--color-explosiva)]"
      />
      <QuinaLink to="tongo" title="Tongo" icon={ImEvil2} bgColor="bg-[color:var(--color-tongo)]" />
      <QuinaLink
        to="cantada"
        title="Cantada"
        icon={PiMicrophoneStageFill}
        bgColor="bg-[color:var(--color-cantada)]"
      />
      <QuinaLink
        to="musical"
        title="Musical"
        icon={PiMusicNotesFill}
        bgColor="bg-[color:var(--color-musical)]"
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
