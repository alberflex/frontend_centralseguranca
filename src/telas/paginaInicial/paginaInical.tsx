import React from "react";
import MenuSuperiorIniciar from "../../componentes/menus/menuSuperiorIniciar";

export default function PaginaInicial() {
  return (
    <>
      <MenuSuperiorIniciar />
      <img
        src="/images/Capa.png"
        alt="Capa"
        style={{
          width: "100%",
          height: "65vh",  
          objectFit: "cover",
          display: "block",
        }}
      />
    </>
  );
}
