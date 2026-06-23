import { BookOpen, BookMarked, Heart, Library, LogIn, LogOut, Menu, Search, Shield, UserRound, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Header() {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="site-header">
      <NavLink className="brand" to="/">
        <BookOpen size={26} aria-hidden="true" />
        <span>MaxDy Manga</span>
      </NavLink>
      <nav className={`site-nav ${mobileOpen ? "is-open" : ""}`} aria-label="Principal">
        <NavLink to="/catalogo" onClick={() => setMobileOpen(false)}>Catalogo</NavLink>
        <NavLink to="/ranking" onClick={() => setMobileOpen(false)}>Ranking</NavLink>
        <NavLink to="/foro/redline-district" onClick={() => setMobileOpen(false)}>Foro</NavLink>
        <NavLink to="/usuario" onClick={() => setMobileOpen(false)}>Usuario</NavLink>
        {isAdmin ? <NavLink to="/admin" onClick={() => setMobileOpen(false)}>Admin</NavLink> : null}
      </nav>
      <div className="header-actions">
        <NavLink className="icon-button" to="/catalogo" aria-label="Buscar">
          <Search size={19} />
        </NavLink>
        {isAdmin ? (
          <NavLink className="icon-button" to="/admin" aria-label="Admin">
            <Shield size={19} />
          </NavLink>
        ) : null}
        <div className="account-menu">
          <button className="icon-button" type="button" onClick={() => setAccountOpen((current) => !current)} aria-label="Cuenta">
            <UserRound size={19} />
          </button>
          {accountOpen ? (
            <div className="account-menu__panel">
              <div className="account-menu__header">
                <span className="user-avatar">{user?.username?.slice(0, 1).toUpperCase() || "G"}</span>
                <div>
                  <strong>{user?.username || "Invitado"}</strong>
                  <small>{isAuthenticated ? user?.role : "Entrá para guardar progreso"}</small>
                </div>
              </div>
              {isAuthenticated ? (
                <>
                  <NavLink to="/usuario/perfil">Perfil</NavLink>
                  <NavLink to="/usuario/biblioteca">Biblioteca</NavLink>
                  <NavLink to="/usuario/favoritos">Favoritos</NavLink>
                  <NavLink to="/usuario/configuracion">Ajustes</NavLink>
                  <button type="button" onClick={logout}>
                    <LogOut size={16} /> Cerrar sesion
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login">
                    <LogIn size={16} /> Iniciar sesion
                  </NavLink>
                  <NavLink to="/registro">Crear cuenta</NavLink>
                </>
              )}
            </div>
          ) : null}
        </div>
        <button className="icon-button header-actions__menu" type="button" aria-label="Menu" aria-expanded={mobileOpen} onClick={() => setMobileOpen((current) => !current)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen ? (
        <div className="menu-drawer" role="dialog" aria-modal="true" aria-label="Menu principal">
          <button className="menu-drawer__backdrop" type="button" aria-label="Cerrar menu" onClick={() => setMobileOpen(false)} />
          <aside className="menu-drawer__panel">
            <div className="account-menu__header">
              <span className="user-avatar">{user?.username?.slice(0, 1).toUpperCase() || "G"}</span>
              <div>
                <strong>{user?.username || "Invitado"}</strong>
                <small>{isAuthenticated ? "Tu biblioteca te espera" : "Entrá para guardar progreso"}</small>
              </div>
            </div>
            <NavLink to="/catalogo" onClick={() => setMobileOpen(false)}><BookMarked size={18} /> Catalogo</NavLink>
            <NavLink to="/ranking" onClick={() => setMobileOpen(false)}><Shield size={18} /> Rankings</NavLink>
            <NavLink to="/foro/redline-district" onClick={() => setMobileOpen(false)}><Library size={18} /> Comunidad</NavLink>
            <NavLink to="/usuario/biblioteca" onClick={() => setMobileOpen(false)}><BookOpen size={18} /> Mi biblioteca</NavLink>
            <NavLink to="/usuario/favoritos" onClick={() => setMobileOpen(false)}><Heart size={18} /> Favoritos</NavLink>
            {isAdmin ? <NavLink to="/admin" onClick={() => setMobileOpen(false)}><Shield size={18} /> Admin</NavLink> : null}
            {isAuthenticated ? (
              <button type="button" onClick={() => { logout(); setMobileOpen(false); }}><LogOut size={18} /> Cerrar sesion</button>
            ) : (
              <NavLink to="/login" onClick={() => setMobileOpen(false)}><LogIn size={18} /> Iniciar sesion</NavLink>
            )}
          </aside>
        </div>
      ) : null}
    </header>
  );
}

export default Header;
