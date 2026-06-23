import { Bookmark, Clock, Heart, Settings, UserRound } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

import MangaGrid from "../components/manga/MangaGrid";
import { mangas } from "../data/mockMangas";

function UserDashboardPage() {
  const { section = "perfil" } = useParams();

  return (
    <section className="page-section page-section--top user-page">
      <aside className="user-sidebar">
        <div className="user-avatar">M</div>
        <strong>MaxDy Reader</strong>
        <NavLink to="/usuario/perfil"><UserRound size={17} /> Perfil</NavLink>
        <NavLink to="/usuario/biblioteca"><Bookmark size={17} /> Biblioteca</NavLink>
        <NavLink to="/usuario/favoritos"><Heart size={17} /> Favoritos</NavLink>
        <NavLink to="/usuario/historial"><Clock size={17} /> Historial</NavLink>
        <NavLink to="/usuario/configuracion"><Settings size={17} /> Configuracion</NavLink>
      </aside>
      <div className="user-content">
        <p className="eyebrow">Usuario</p>
        <h1>{section}</h1>
        {section === "perfil" ? (
          <div className="profile-summary">
            <span>Rol USER</span>
            <span>Email verificado pendiente</span>
            <span>3 mangas activos</span>
          </div>
        ) : (
          <MangaGrid items={mangas.slice(0, 3)} />
        )}
      </div>
    </section>
  );
}

export default UserDashboardPage;
