import { ArrowRight, Flame, UserPlus } from "lucide-react";

import heroImage from "../assets/images/maxdy-hero.png";
import Button from "../components/common/Button";
import SectionHeader from "../components/common/SectionHeader";
import MangaGrid from "../components/manga/MangaGrid";
import MangaCard from "../components/manga/MangaCard";
import { mangas } from "../data/mockMangas";
import { formatNumber } from "../utils/formatters";

function HomePage() {
  const popular = mangas.slice(0, 3);
  const latest = mangas.flatMap((manga) => manga.chapters.slice(-1).map((chapter) => ({ manga, chapter })));

  return (
    <>
      <section className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,8,.95), rgba(5,5,8,.72), rgba(5,5,8,.22)), url(${heroImage})` }}>
        <div className="hero__content">
          <p className="eyebrow">MaxDy Manga</p>
          <h1>Lectura, ranking y comunidad manga en una plataforma full stack.</h1>
          <p>
            Catalogo navegable, lector responsive, favoritos, biblioteca, progreso y foros listos para conectar con
            PostgreSQL.
          </p>
          <div className="hero__actions">
            <Button to="/catalogo" icon={Flame}>Explorar catalogo</Button>
            <Button to="/registro" variant="ghost" icon={UserPlus}>Crear cuenta</Button>
          </div>
        </div>
        <div className="hero__stats">
          <span>{formatNumber(24400)} lecturas</span>
          <span>Top #{popular[0].ranking}</span>
          <span>{popular[0].score} score</span>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader eyebrow="Popular ahora" title="Series destacadas" action={<Button to="/catalogo" variant="text" icon={ArrowRight}>Ver todo</Button>} />
        <MangaGrid items={popular} />
      </section>

      <section className="page-section page-section--split">
        <div>
          <SectionHeader eyebrow="Ranking" title="Top de la semana" />
          <div className="ranking-list">
            {mangas.map((manga) => (
              <MangaCard key={manga.id} manga={manga} compact />
            ))}
          </div>
        </div>
        <div>
          <SectionHeader eyebrow="Ultimos capitulos" title="Nuevas actualizaciones" />
          <div className="update-list">
            {latest.map(({ manga, chapter }) => (
              <a className="update-row" href={`/lector/${manga.slug}/${chapter.number}`} key={chapter.id}>
                <span>{manga.title}</span>
                <strong>Capitulo {chapter.number}: {chapter.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section">
        <SectionHeader eyebrow="Colecciones" title="En emision, finalizados y recomendaciones" />
        <div className="collection-grid">
          <a href="/catalogo?status=ONGOING">En emision</a>
          <a href="/catalogo?status=FINISHED">Finalizados</a>
          <a href="/ranking">Mejor puntuados</a>
          <a href="/usuario/biblioteca">Tu biblioteca</a>
        </div>
      </section>
    </>
  );
}

export default HomePage;
