import { Send, Sparkles, UsersRound } from "lucide-react";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../components/common/Button";
import RatingStars from "../components/manga/RatingStars";
import CommentThread from "../components/manga/CommentThread";
import { comments, mangas } from "../data/mockMangas";

const onlineUsers = [
  { id: "u1", name: "Akari", mood: "leyendo Redline" },
  { id: "u2", name: "NoirReader", mood: "moderando spoilers" },
  { id: "u3", name: "Mika", mood: "buscando romance sci-fi" },
  { id: "u4", name: "Dylan", mood: "rankeando capitulos" },
];

function ForumPage() {
  const { slug } = useParams();
  const manga = mangas.find((item) => item.slug === slug) || mangas[0];
  const [content, setContent] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [localComments, setLocalComments] = useState(comments);
  const [recommendations, setRecommendations] = useState([
    { id: "rec-1", user: "Mika", title: "Rose Byte", reason: "romance cyberpunk con tension de torneo" },
    { id: "rec-2", user: "NoirReader", title: "Hollow Ink", reason: "terror con paneles muy cinematograficos" },
  ]);
  const [error, setError] = useState("");
  const [communityScore, setCommunityScore] = useState(Math.round(manga.score || 8));

  const trending = useMemo(() => mangas.slice().sort((a, b) => b.popularity - a.popularity).slice(0, 4), []);

  const submitComment = (event) => {
    event.preventDefault();

    if (content.trim().length < 2) {
      setError("El comentario debe tener al menos 2 caracteres.");
      return;
    }

    setLocalComments((current) => [
      {
        id: `local-${Date.now()}`,
        user: "Vos",
        role: "USER",
        avatar: "V",
        content,
        likes: 0,
        createdAt: "Ahora",
        edited: false,
        replies: [],
      },
      ...current,
    ]);
    setContent("");
    setError("");
  };

  const submitRecommendation = (event) => {
    event.preventDefault();

    if (recommendation.trim().length < 3) {
      setError("La recomendacion necesita un poco mas de detalle.");
      return;
    }

    setRecommendations((current) => [
      { id: `rec-${Date.now()}`, user: "Vos", title: manga.title, reason: recommendation },
      ...current,
    ]);
    setRecommendation("");
    setError("");
  };

  return (
    <section className="page-section page-section--top forum-page">
      <div className="forum-hero">
        <div>
          <p className="eyebrow">Foro en vivo</p>
          <h1>{manga.title}</h1>
          <p>Comentá, recomendá, rankeá y seguí la actividad de la comunidad alrededor de este manga.</p>
          <RatingStars initialScore={communityScore} onRate={setCommunityScore} />
        </div>
        <aside className="online-panel">
          <h2><UsersRound size={20} /> Online ahora</h2>
          {onlineUsers.map((user) => (
            <article key={user.id}>
              <span className="online-dot" />
              <div>
                <strong>{user.name}</strong>
                <small>{user.mood}</small>
              </div>
            </article>
          ))}
        </aside>
      </div>

      <div className="forum-grid">
        <div>
          <form className="comment-form" onSubmit={submitComment}>
            <textarea value={content} onChange={(event) => setContent(event.target.value)} placeholder="Sumate a la conversacion" rows="4" />
            {error ? <small className="field-error">{error}</small> : null}
            <Button icon={Send}>Publicar comentario</Button>
          </form>
          <CommentThread comments={localComments} />
        </div>

        <aside className="recommendation-panel">
          <h2><Sparkles size={20} /> Recomendaciones</h2>
          <form onSubmit={submitRecommendation}>
            <textarea value={recommendation} onChange={(event) => setRecommendation(event.target.value)} placeholder="Recomendá algo para fans de esta obra" rows="3" />
            <Button type="submit" variant="ghost">Recomendar</Button>
          </form>
          {recommendations.map((item) => (
            <article key={item.id}>
              <strong>{item.title}</strong>
              <p>{item.reason}</p>
              <small>por {item.user}</small>
            </article>
          ))}
          <h2>Trending comunidad</h2>
          {trending.map((item) => (
            <a href={`/mangas/${item.slug}`} key={item.id}>{item.title} · {item.score}/10</a>
          ))}
        </aside>
      </div>
    </section>
  );
}

export default ForumPage;
