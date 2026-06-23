import MangaCard from "./MangaCard";

function MangaGrid({ items }) {
  return (
    <div className="manga-grid">
      {items.map((manga) => (
        <MangaCard key={manga.id} manga={manga} />
      ))}
    </div>
  );
}

export default MangaGrid;
