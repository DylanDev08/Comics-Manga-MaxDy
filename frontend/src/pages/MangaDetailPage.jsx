import { BookmarkPlus, Heart, MessageCircle, Star } from "lucide-react";
import { useParams } from "react-router-dom";

import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import ChapterList from "../components/manga/ChapterList";
import CommentThread from "../components/manga/CommentThread";
import { comments, mangas } from "../data/mockMangas";
import { statusLabels } from "../utils/formatters";

function MangaDetailPage() {
  const { slug } = useParams();
  const manga = mangas.find((item) => item.slug === slug);

  if (!manga) {
    return <EmptyState title="Manga no encontrado" text="La serie solicitada no esta disponible." />;
  }

  return (
    <>
      <section className="detail-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(5,5,8,.96), rgba(5,5,8,.55)), url(${manga.bannerUrl})` }}>
        <img src={manga.coverUrl} alt={`Portada de ${manga.title}`} />
        <div>
          <Badge tone="red">{statusLabels[manga.status]}</Badge>
          <h1>{manga.title}</h1>
          <p className="detail-hero__alt">{manga.alternativeTitle}</p>
          <p>{manga.description}</p>
          <div className="detail-hero__meta">
            <span><Star size={18} /> {manga.score || "N/A"}</span>
            <span>Ranking #{manga.ranking}</span>
            <span>{manga.publicationStart}</span>
          </div>
          <div className="tag-list">
            {manga.genres.map((genre) => <span key={genre}>{genre}</span>)}
          </div>
          <div className="hero__actions">
            <Button icon={Heart}>Favorito</Button>
            <Button variant="ghost" icon={BookmarkPlus}>Biblioteca</Button>
            <Button to={`/foro/${manga.slug}`} variant="text" icon={MessageCircle}>Foro</Button>
          </div>
        </div>
      </section>

      <section className="page-section page-section--split">
        <div>
          <h2>Capitulos</h2>
          <ChapterList manga={manga} />
        </div>
        <div>
          <h2>Comentarios</h2>
          <CommentThread comments={comments} />
        </div>
      </section>
    </>
  );
}

export default MangaDetailPage;
