import { useState } from "react";
import "./App.css";

// Mock Comment Data (initial state)
const mockComments = [
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
  const addReply = (id, text) => {
    const addNestedReply = (commentList) => {
      return commentList.map((comment) => {
        // your code
        return comment;
      });
    };

    // TODO: update state with new nested reply
  };

  // Function to add top-level comment
  const addComment = () => {
    // TODO: Your code
  };

  // Recursive Comment Component
  const Comment = ({ comment }) => {
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyText, setReplyText] = useState("");

    const handleReply = () => {
      // TODO: Your code
    };

    return (
      <div className="comment">
        <div>{comment.text}</div>
        <button onClick={() => setShowReplyInput(!showReplyInput)}>
          Add a reply
        </button>

        {showReplyInput && (
          <div className="reply-box">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your reply..."
            />
            <button onClick={handleReply}>Submit</button>
          </div>
        )}

        <div className="replies">{/* TODO:your code */}</div>
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
        />
        <button onClick={addComment}>Add Comment</button>
      </div>

      <div className="comments">{/* TODO: your code */}</div>
    </div>
  );
}

export default App;
