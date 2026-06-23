import { Play } from "lucide-react";
import { Link } from "react-router-dom";

function ChapterList({ manga }) {
  return (
    <div className="chapter-list">
      {manga.chapters.map((chapter) => (
        <Link className="chapter-row" key={chapter.id} to={`/lector/${manga.slug}/${chapter.number}`}>
          <span>Capitulo {chapter.number}</span>
          <strong>{chapter.title}</strong>
          <Play size={18} aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}

export default ChapterList;
