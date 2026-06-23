import { Filter, Search } from "lucide-react";

import { genres } from "../../data/mockMangas";

function MangaFilters({ filters, onChange }) {
  const update = (key, value) => onChange((current) => ({ ...current, [key]: value }));

  return (
    <section className="filters">
      <label className="search-field">
        <Search size={18} aria-hidden="true" />
        <input value={filters.search} onChange={(event) => update("search", event.target.value)} placeholder="Buscar manga" />
      </label>
      <label>
        <Filter size={18} aria-hidden="true" />
        <select value={filters.genre} onChange={(event) => update("genre", event.target.value)}>
          <option value="todos">Todos los generos</option>
          {genres.map((genre) => (
            <option value={genre} key={genre}>
              {genre}
            </option>
          ))}
        </select>
      </label>
      <select value={filters.status} onChange={(event) => update("status", event.target.value)}>
        <option value="todos">Todos los estados</option>
        <option value="PUBLISHING">En emision</option>
        <option value="FINISHED">Finalizado</option>
        <option value="PAUSED">Pausado</option>
        <option value="CANCELLED">Cancelado</option>
        <option value="UPCOMING">Proximamente</option>
      </select>
      <select value={filters.type} onChange={(event) => update("type", event.target.value)}>
        <option value="todos">Todos los tipos</option>
        <option value="MANGA">Manga</option>
        <option value="MANHWA">Manhwa</option>
        <option value="MANHUA">Manhua</option>
        <option value="COMIC">Comic</option>
      </select>
      <select value={filters.sort} onChange={(event) => update("sort", event.target.value)}>
        <option value="ranking">Ranking</option>
        <option value="popularidad">Popularidad</option>
        <option value="score">Puntuacion</option>
      </select>
    </section>
  );
}

export default MangaFilters;
