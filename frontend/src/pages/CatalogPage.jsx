import EmptyState from "../components/common/EmptyState";
import SectionHeader from "../components/common/SectionHeader";
import MangaCardSkeleton from "../components/manga/MangaCardSkeleton";
import MangaFilters from "../components/manga/MangaFilters";
import MangaGrid from "../components/manga/MangaGrid";
import { useMangaFilters } from "../hooks/useMangaFilters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { mangaService } from "../services/manga.service";
import { extractMangaList } from "../utils/dataMappers";

function CatalogPage() {
  const { filters, setFilters, filteredMangas } = useMangaFilters();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [apiMangas, setApiMangas] = useState(null);
  const [source, setSource] = useState("mock");

  useEffect(() => {
    const status = searchParams.get("status");
    const type = searchParams.get("type");

    if (status || type) {
      setFilters((current) => ({
        ...current,
        status: status || current.status,
        type: type || current.type,
      }));
    }
  }, [searchParams, setFilters]);

  useEffect(() => {
    setLoading(true);
    const timeout = window.setTimeout(async () => {
      try {
        const payload = await mangaService.list({
          search: filters.search,
          genre: filters.genre === "todos" ? "" : filters.genre,
          status: filters.status === "todos" ? "" : filters.status,
          type: filters.type === "todos" ? "" : filters.type,
          sort: filters.sort,
          limit: 24,
        });
        const mapped = extractMangaList(payload);
        setApiMangas(mapped.length > 0 ? mapped : null);
        setSource(mapped.length > 0 ? "api" : "mock");
      } catch {
        setApiMangas(null);
        setSource("mock");
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => window.clearTimeout(timeout);
  }, [filters]);

  const visibleMangas = apiMangas || filteredMangas;

  return (
    <section className="page-section page-section--top">
      <SectionHeader eyebrow="Catalogo" title="Mangas disponibles" />
      <div className="data-source-pill">{source === "api" ? "Datos desde backend" : "Modo demo con mocks"}</div>
      <MangaFilters filters={filters} onChange={setFilters} />
      {loading ? (
        <div className="manga-grid">
          {Array.from({ length: 8 }, (_, index) => <MangaCardSkeleton key={index} />)}
        </div>
      ) : visibleMangas.length > 0 ? (
        <MangaGrid items={visibleMangas} />
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
