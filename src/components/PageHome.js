import React from "react";
import PageMatch from "./PageMatch";

const PageHome = () => {
  return (
    <div className="col-md-10 offset-md-1">
      <h2 className="text-center">Bienvenido a tu web de marcadores de deportes!</h2>
      <p>Aqui puedes ver los marcardores recientes de los partidos de tus deportes favoritos.</p>
      <PageMatch
        isHome={true}
      />
    </div>
  );
};

export default PageHome;