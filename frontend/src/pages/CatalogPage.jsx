import EmptyState from "../components/common/EmptyState";
import SectionHeader from "../components/common/SectionHeader";
import MangaFilters from "../components/manga/MangaFilters";
import MangaGrid from "../components/manga/MangaGrid";
import { useMangaFilters } from "../hooks/useMangaFilters";

function CatalogPage() {
  const { filters, setFilters, filteredMangas } = useMangaFilters();

  return (
    <section className="page-section page-section--top">
      <SectionHeader eyebrow="Catalogo" title="Mangas disponibles" />
      <MangaFilters filters={filters} onChange={setFilters} />
      {filteredMangas.length > 0 ? (
        <MangaGrid items={filteredMangas} />
      ) : (
        <EmptyState title="Sin resultados" text="Ajusta los filtros para encontrar nuevas series." />
      )}
      <div className="pagination">
        <button type="button">1</button>
        <button type="button">2</button>
        <button type="button">3</button>
      </div>
    </section>
  );
}

export default CatalogPage;
