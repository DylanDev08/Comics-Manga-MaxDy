import SectionHeader from "../components/common/SectionHeader";
import MangaCard from "../components/manga/MangaCard";
import { mangas } from "../data/mockMangas";

function RankingPage() {
  return (
    <section className="page-section page-section--top">
      <SectionHeader eyebrow="Ranking" title="Top MaxDy" />
      <div className="ranking-list ranking-list--wide">
        {mangas.map((manga) => (
          <MangaCard key={manga.id} manga={manga} compact />
        ))}
      </div>
    </section>
  );
}

export default RankingPage;
