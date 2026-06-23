import { BookmarkPlus, Heart, MessageCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Badge from "../components/common/Badge";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import ChapterList from "../components/manga/ChapterList";
import CommentThread from "../components/manga/CommentThread";
import RatingStars from "../components/manga/RatingStars";
import { comments, mangas } from "../data/mockMangas";
import { mangaService } from "../services/manga.service";
import { mapApiManga } from "../utils/dataMappers";
import { statusLabels } from "../utils/formatters";

function MangaDetailPage() {
  const { slug } = useParams();
  const [apiManga, setApiManga] = useState(null);
  const manga = apiManga || mangas.find((item) => item.slug === slug);
  const [favorite, setFavorite] = useState(false);
  const [library, setLibrary] = useState(false);
  const [ratingMessage, setRatingMessage] = useState("");

  useEffect(() => {
    let active = true;

    mangaService
      .detail(slug)
      .then((payload) => {
        if (active) setApiManga(mapApiManga(payload));
      })
      .catch(() => {
        if (active) setApiManga(null);
      });

    return () => {
      active = false;
    };
  }, [slug]);

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
            <span>{manga.type}</span>
            <span>{manga.publicationStart}</span>
          </div>
          <div className="tag-list">
            {manga.genres.map((genre) => <span key={genre}>{genre}</span>)}
          </div>
          <div className="detail-rating">
            <strong>Tu ranking</strong>
            <RatingStars initialScore={manga.score} onRate={(score) => setRatingMessage(`Puntaje guardado: ${score}/10`)} />
            {ratingMessage ? <small>{ratingMessage}</small> : null}
          </div>
          <div className="hero__actions">
            <Button to={`/lector/${manga.slug}/${manga.chapters[0]?.number || 1}`}>Leer capitulo</Button>
            <Button icon={Heart} variant={favorite ? "primary" : "ghost"} onClick={() => setFavorite((current) => !current)}>
              {favorite ? "En favoritos" : "Favorito"}
            </Button>
            <Button variant={library ? "primary" : "ghost"} icon={BookmarkPlus} onClick={() => setLibrary((current) => !current)}>
              {library ? "En biblioteca" : "Biblioteca"}
            </Button>
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
