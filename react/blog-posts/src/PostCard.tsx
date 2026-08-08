interface PostCardProps {
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
}
function PostCard({ title, body, tags, reactions, views }: PostCardProps) {
  return (
    <div className="card-container">
      <h2 className="post-title">{title}</h2>
      <p className="post-body">{body}</p>
      <div className="tags-container">
        {tags.map((tag, index) => (
          <span key={index} className="tag">
            #{tag}
          </span>
        ))}
      </div>
      <div className="interactions">
        <p>
          👍🏼 {reactions.likes} | 👎🏼 {reactions.dislikes} | 👁️ {views} views
        </p>
      </div>
    </div>
  );
}

export default PostCard;
