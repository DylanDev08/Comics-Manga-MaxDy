import { BookOpen, Star } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import { statusLabels } from "../../utils/formatters";

function MangaCard({ manga, compact = false }) {
  return (
    <article className={`manga-card ${compact ? "manga-card--compact" : ""}`}>
      <Link to={`/mangas/${manga.slug}`} className="manga-card__cover">
        <img src={manga.coverUrl} alt={`Portada de ${manga.title}`} loading="lazy" />
        <span className="manga-card__rank">#{manga.ranking}</span>
      </Link>
      <div className="manga-card__body">
        <Badge tone={manga.status === "FINISHED" ? "muted" : "red"}>{statusLabels[manga.status]}</Badge>
        <h3>
          <Link to={`/mangas/${manga.slug}`}>{manga.title}</Link>
        </h3>
        <div className="manga-card__meta">
          <span>
            <Star size={15} aria-hidden="true" /> {manga.score || "N/A"}
          </span>
          <span>
            <BookOpen size={15} aria-hidden="true" /> {manga.chapters.length} caps
          </span>
        </div>
        <div className="tag-list">
          {manga.genres.map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default MangaCard;
