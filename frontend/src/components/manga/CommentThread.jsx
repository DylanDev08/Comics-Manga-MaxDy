import { Flag, Heart, MessageCircle } from "lucide-react";

function CommentThread({ comments }) {
  return (
    <div className="comment-thread">
      {comments.map((comment) => (
        <article className="comment" key={comment.id}>
          <div className="comment__avatar">{comment.user.slice(0, 1)}</div>
          <div className="comment__body">
            <header>
              <strong>{comment.user}</strong>
              <span>{comment.role}</span>
            </header>
            <p>{comment.content}</p>
            <div className="comment__actions">
              <button type="button">
                <Heart size={16} /> {comment.likes}
              </button>
              <button type="button">
                <MessageCircle size={16} /> Responder
              </button>
              <button type="button">
                <Flag size={16} /> Reportar
              </button>
            </div>
            {comment.replies.map((reply) => (
              <div className="comment comment--reply" key={reply.id}>
                <div className="comment__avatar">{reply.user.slice(0, 1)}</div>
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
