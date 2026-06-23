export const mapApiManga = (manga) => ({
  ...manga,
  genres: manga.genres?.map((genre) => (typeof genre === "string" ? genre : genre.slug || genre.name)) || [],
  chapters: manga.chapters || [],
  badges: manga.badges || [],
});

export const extractMangaList = (payload) => {
  const items = payload?.items || payload?.data?.items || payload || [];
  return Array.isArray(items) ? items.map(mapApiManga) : [];
};
