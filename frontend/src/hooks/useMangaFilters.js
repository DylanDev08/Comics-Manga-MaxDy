import { useMemo, useState } from "react";

import { mangas } from "../data/mockMangas";
import { normalizeText } from "../utils/formatters";

export function useMangaFilters() {
  const [filters, setFilters] = useState({ search: "", genre: "todos", status: "todos", type: "todos", sort: "ranking" });

  const filteredMangas = useMemo(() => {
    const search = normalizeText(filters.search);

    return mangas
      .filter((manga) => (search ? normalizeText(`${manga.title} ${manga.alternativeTitle}`).includes(search) : true))
      .filter((manga) => (filters.genre === "todos" ? true : manga.genres.includes(filters.genre)))
      .filter((manga) => (filters.status === "todos" ? true : manga.status === filters.status))
      .filter((manga) => (filters.type === "todos" ? true : manga.type === filters.type))
      .sort((a, b) => {
        if (filters.sort === "score") return b.score - a.score;
        if (filters.sort === "popularidad") return b.popularity - a.popularity;
        return a.ranking - b.ranking;
      });
  }, [filters]);

  return { filters, setFilters, filteredMangas };
}
