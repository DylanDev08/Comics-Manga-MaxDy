import { Send } from "lucide-react";
import { useParams } from "react-router-dom";

import Button from "../components/common/Button";
import CommentThread from "../components/manga/CommentThread";
import { comments, mangas } from "../data/mockMangas";

function ForumPage() {
  const { slug } = useParams();
  const manga = mangas.find((item) => item.slug === slug) || mangas[0];

  return (
    <section className="page-section page-section--top forum-page">
      <p className="eyebrow">Foro</p>
      <h1>{manga.title}</h1>
      <form className="comment-form">
        <textarea placeholder="Sumate a la conversacion" rows="4" />
        <Button icon={Send}>Publicar</Button>
      </form>
      <CommentThread comments={comments} />
    </section>
  );
}

export default ForumPage;
