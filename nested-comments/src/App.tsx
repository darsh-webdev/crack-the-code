import { useState } from "react";
import "./App.css";

type Comment = {
  id: number;
  text: string;
  replies: Comment[] | [];
};

// Mock Comment Data (initial state)
const mockComments: Comment[] = [
  {
    id: 1,
    text: "Happy New Year folks! What are your resolutions this year?",
    replies: [
      {
        id: 2,
        text: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: 3,
            text: "I tried last year and gave up.",
            replies: [
              {
                id: 4,
                text: "Good on you, nothing is more important than good health.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Counter for generating unique IDs
let idCounter = 4;

function App() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  // Function to add a reply
  const addReply = (id: number, text: string) => {
    idCounter++;
    const newReply = {
      id: idCounter,
      text,
      replies: [],
    };

    const addNestedReply = (commentList: Comment[]) => {
      return commentList.map((comment) => {
        if (comment.id === id) {
          return { ...comment, replies: [...comment.replies, newReply] };
        }
        return { ...comment, replies: addNestedReply(comment.replies) };
      });
    };

    setComments((prev) => addNestedReply(prev));
  };

  // Function to add top-level comment
  const addComment = () => {
    if (newComment.trim() === "") return;
    idCounter++;
    const comment = {
      id: idCounter,
      text: newComment.trim(),
      replies: [],
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  // Recursive Comment Component
  const Comment = ({
    comment,
    addReply,
  }: {
    comment: Comment;
    addReply: (id: number, text: string) => void;
  }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReply = () => {
      if (replyText.trim()) {
        addReply(comment.id, replyText);
        setReplyText("");
        setShowReplyInput(false);
      }
    };

    return (
      <div className="comment" data-testid={`comment-${comment.id}`}>
        <div>{comment.text}</div>
        <button
          className="reply-btn"
          onClick={() => setShowReplyInput(!showReplyInput)}
          data-testid={`reply-btn-${comment.id}`}
        >
          Add a reply
        </button>

        {showReplyInput && (
          <div className="reply-box">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              data-testid={`reply-input-${comment.id}`}
              placeholder="Type your reply..."
            />
            <button
              data-testid={`submit-reply-${comment.id}`}
              onClick={handleReply}
            >
              Submit
            </button>
          </div>
        )}

        <div className="replies">
          {comment.replies.length > 0 &&
            comment.replies.map((reply) => (
              <Comment key={reply.id} comment={reply} addReply={addReply} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h2>Nested Comments</h2>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type a comment..."
          data-testid="new-comment-input"
        />
        <button data-testid="add-comment-btn" onClick={addComment}>
          Add Comment
        </button>
      </div>

      <div className="comments">
        {comments.length &&
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} addReply={addReply} />
          ))}
      </div>
    </div>
  );
}

export default App;
