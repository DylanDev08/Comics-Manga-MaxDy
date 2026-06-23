import { Flag, Heart, MessageCircle, Send } from "lucide-react";
import { useState } from "react";

function CommentThread({ comments }) {
  const [items, setItems] = useState(comments);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [notice, setNotice] = useState("");

  const likeComment = (commentId) => {
    setItems((current) =>
      current.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment))
    );
  };

  const submitReply = (commentId) => {
    if (replyText.trim().length < 2) {
      setNotice("La respuesta debe tener al menos 2 caracteres.");
      return;
    }

    setItems((current) =>
      current.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                { id: `reply-${Date.now()}`, user: "Vos", avatar: "V", content: replyText, createdAt: "Ahora" },
              ],
            }
          : comment
      )
    );
    setReplyText("");
    setReplyingTo(null);
    setNotice("Respuesta publicada.");
  };

  const reportComment = () => {
    setNotice("Reporte enviado para moderacion.");
  };

  if (items.length === 0) {
    return <div className="empty-state"><h3>Sin comentarios</h3><p>Sé la primera persona en abrir la charla.</p></div>;
  }

  return (
    <div className="comment-thread">
      {notice ? <div className="notice">{notice}</div> : null}
      {items.map((comment) => (
        <article className="comment" key={comment.id}>
          <div className="comment__avatar">{comment.avatar || comment.user.slice(0, 1)}</div>
          <div className="comment__body">
            <header>
              <strong>{comment.user}</strong>
              <span>{comment.role}</span>
              <time>{comment.createdAt}</time>
              {comment.edited ? <small>Editado</small> : null}
            </header>
            <p>{comment.content}</p>
            <div className="comment__actions">
              <button type="button" onClick={() => likeComment(comment.id)}>
                <Heart size={16} /> {comment.likes}
              </button>
              <button type="button" onClick={() => setReplyingTo((current) => (current === comment.id ? null : comment.id))}>
                <MessageCircle size={16} /> Responder
              </button>
              <button type="button" onClick={reportComment}>
                <Flag size={16} /> Reportar
              </button>
            </div>
            {replyingTo === comment.id ? (
              <div className="reply-form">
                <input value={replyText} onChange={(event) => setReplyText(event.target.value)} placeholder="Escribir respuesta" />
                <button type="button" onClick={() => submitReply(comment.id)} aria-label="Enviar respuesta">
                  <Send size={17} />
                </button>
              </div>
            ) : null}
            {comment.replies.map((reply) => (
              <div className="comment comment--reply" key={reply.id}>
                <div className="comment__avatar">{reply.avatar || reply.user.slice(0, 1)}</div>
                <p>
                  <strong>{reply.user}</strong> {reply.content}
                </p>
              </div>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export default CommentThread;
