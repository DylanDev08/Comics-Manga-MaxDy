import { Bookmark, Clock, Heart, Save, Settings, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

import Button from "../components/common/Button";
import MangaGrid from "../components/manga/MangaGrid";
import { useAuth } from "../context/AuthContext";
import { mangas } from "../data/mockMangas";

const initialLibrary = mangas.slice(0, 6).map((manga, index) => ({
  ...manga,
  libraryStatus: index % 3 === 0 ? "leidos" : index % 3 === 1 ? "sin-leer" : "en-emision",
  progress: index % 3 === 0 ? 100 : index % 3 === 1 ? 0 : 45 + index * 6,
}));

function UserDashboardPage() {
  const { section = "perfil" } = useParams();
  const { user } = useAuth();
  const [library, setLibrary] = useState(initialLibrary);
  const [settings, setSettings] = useState({
    username: user?.username || "MaxDy Reader",
    favoriteGenre: "accion",
    readerMode: "vertical",
    notifications: true,
  });
  const [notice, setNotice] = useState("");

  const grouped = useMemo(
    () => ({
      enEmision: library.filter((manga) => manga.libraryStatus === "en-emision"),
      leidos: library.filter((manga) => manga.libraryStatus === "leidos"),
      sinLeer: library.filter((manga) => manga.libraryStatus === "sin-leer"),
      favoritos: library.filter((manga) => manga.badges?.includes("TOP") || manga.score >= 8.5),
    }),
    [library]
  );

  const favoriteGenre = useMemo(() => {
    const counts = library.flatMap((manga) => manga.genres).reduce((acc, genre) => ({ ...acc, [genre]: (acc[genre] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "accion";
  }, [library]);

  const updateLibraryStatus = (mangaId, libraryStatus) => {
    setLibrary((items) => items.map((manga) => (manga.id === mangaId ? { ...manga, libraryStatus } : manga)));
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setNotice("Ajustes guardados localmente. Listo para conectar con PATCH /api/v1/users/me.");
  };

  const renderShelf = (title, items) => (
    <div className="user-shelf">
      <h2>{title}</h2>
      {items.length > 0 ? <MangaGrid items={items} /> : <p>No hay mangas en esta lista todavía.</p>}
    </div>
  );

  return (
    <section className="page-section page-section--top user-page">
      <aside className="user-sidebar">
        <div className="user-avatar">{settings.username.slice(0, 1).toUpperCase()}</div>
        <strong>{settings.username}</strong>
        <NavLink to="/usuario/perfil"><UserRound size={17} /> Perfil</NavLink>
        <NavLink to="/usuario/biblioteca"><Bookmark size={17} /> Biblioteca</NavLink>
        <NavLink to="/usuario/favoritos"><Heart size={17} /> Favoritos</NavLink>
        <NavLink to="/usuario/historial"><Clock size={17} /> Historial</NavLink>
        <NavLink to="/usuario/configuracion"><Settings size={17} /> Configuracion</NavLink>
      </aside>
      <div className="user-content">
        <p className="eyebrow">Usuario</p>
        <h1>{section}</h1>
        {notice ? <div className="notice">{notice}</div> : null}

        {section === "perfil" ? (
          <>
            <div className="profile-summary">
              <span>Rol {user?.role || "USER"}</span>
              <span>Genero favorito: {favoriteGenre}</span>
              <span>{grouped.enEmision.length} en emision</span>
              <span>{grouped.leidos.length} leidos</span>
              <span>{grouped.sinLeer.length} sin leer</span>
            </div>
            <div className="reading-progress-list">
              {library.slice(0, 4).map((manga) => (
                <article key={manga.id}>
                  <img src={manga.coverUrl} alt="" />
                  <div>
                    <strong>{manga.title}</strong>
                    <span>{manga.libraryStatus} · {manga.progress}%</span>
                    <div className="progress-bar"><span style={{ width: `${manga.progress}%` }} /></div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}

        {section === "biblioteca" ? (
          <>
            {renderShelf("En emision", grouped.enEmision)}
            {renderShelf("Leidos", grouped.leidos)}
            {renderShelf("Sin leer", grouped.sinLeer)}
          </>
        ) : null}

        {section === "favoritos" ? renderShelf("Favoritos y recomendados", grouped.favoritos) : null}

        {section === "historial" ? (
          <div className="reading-progress-list">
            {library.map((manga) => (
              <article key={manga.id}>
                <img src={manga.coverUrl} alt="" />
                <div>
                  <strong>{manga.title}</strong>
                  <span>Ultimo progreso: {manga.progress}%</span>
                  <div className="hero__actions">
                    <Button to={`/lector/${manga.slug}/1`} variant="ghost">Continuar</Button>
                    <Button variant="text" onClick={() => updateLibraryStatus(manga.id, "leidos")}>Marcar leido</Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {section === "configuracion" ? (
          <form className="settings-form" onSubmit={saveSettings}>
            <label>
              Username
              <input value={settings.username} onChange={(event) => setSettings((current) => ({ ...current, username: event.target.value }))} />
            </label>
            <label>
              Genero favorito
              <select value={settings.favoriteGenre} onChange={(event) => setSettings((current) => ({ ...current, favoriteGenre: event.target.value }))}>
                <option value="accion">Accion</option>
                <option value="fantasia">Fantasia</option>
                <option value="romance">Romance</option>
                <option value="terror">Terror</option>
                <option value="sci-fi">Sci-Fi</option>
              </select>
            </label>
            <label>
              Modo de lectura
              <select value={settings.readerMode} onChange={(event) => setSettings((current) => ({ ...current, readerMode: event.target.value }))}>
                <option value="vertical">Vertical webtoon</option>
                <option value="page">Pagina</option>
              </select>
            </label>
            <label className="toggle-row">
              <input type="checkbox" checked={settings.notifications} onChange={(event) => setSettings((current) => ({ ...current, notifications: event.target.checked }))} />
              Notificaciones de capitulos nuevos
            </label>
            <Button type="submit" icon={Save}>Guardar ajustes</Button>
          </form>
        ) : null}
      </div>
    </section>
  );
}

export default UserDashboardPage;
