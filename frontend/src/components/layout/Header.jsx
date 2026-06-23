import { BookOpen, Menu, Search, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <BookOpen size={26} aria-hidden="true" />
        <span>MaxDy Manga</span>
      </NavLink>
      <nav className="site-nav" aria-label="Principal">
        <NavLink to="/catalogo">Catalogo</NavLink>
        <NavLink to="/ranking">Ranking</NavLink>
        <NavLink to="/foro/redline-district">Foro</NavLink>
        <NavLink to="/usuario">Usuario</NavLink>
      </nav>
      <div className="header-actions">
        <NavLink className="icon-button" to="/catalogo" aria-label="Buscar">
          <Search size={19} />
        </NavLink>
        <NavLink className="icon-button" to="/login" aria-label="Cuenta">
          <UserRound size={19} />
        </NavLink>
        <button className="icon-button header-actions__menu" type="button" aria-label="Menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export default Header;
