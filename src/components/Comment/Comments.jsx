import "./Comment.css";
import Comment from "./Comment";

function Comments() {
  const comments = [1, 2, 3];
  return (
    <div className="commment-container">
      <form method="post" className="comment-form">
        <input type="text" placeholder="comment.............." />
        <button type="submit" className="btn btn-primary">
          Send
        </button>
      </form>
      <div className="comments">
        {comments.map((com) => (
          <Comment />
        ))}
      </div>
    </div>
  );
}

export default Comments;
