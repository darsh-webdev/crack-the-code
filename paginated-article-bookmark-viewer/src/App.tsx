import { useState } from "react";
import "./App.css";

const ARTICLES_PER_PAGE = 5;

// function generateDummyArticles(count) → returns an array of article objects
// Each article: { id, title, content, bookmarked: false }
function generateDummyArticles(count: number) {
  const articles = Array.from({ length: count }, (_, i) => ({
    id: new Date().getSeconds() + i,
    title: `Article Title ${i + 1}`,
    content: `This is the content of article ${i + 1}.`,
    bookmarked: false,
  }));

  return articles;
}

function App() {
  const [articles, setArticles] = useState(generateDummyArticles(23));
  const [currentPage, setCurrentPage] = useState(1); // current page of pagination
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false); // filter flag

  // Helper functions
  function toggleBookmark(id: number) {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, bookmarked: !article.bookmarked }
          : article
      )
    );
  }

  function getFilteredArticles() {
    return showOnlyBookmarked
      ? articles.filter((article) => article.bookmarked)
      : articles;
  }

  const totalPages = Math.ceil(
    getFilteredArticles().length / ARTICLES_PER_PAGE
  );

  function getCurrentArticles() {
    const filtered = getFilteredArticles();
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    return filtered.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }

  const currentArticles = getCurrentArticles();

  function goToPage(page: number) {
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  }

  return (
    <>
      <h1>Article Bookmark Viewer</h1>
      <div className="paginated-container" data-testid="paginated-container">
        <div className="header" data-testid="header">
          <h2>Articles</h2>
          <label htmlFor="bookmark-filter">
            <input
              id="bookmark-filter"
              type="checkbox"
              className="checkbox"
              data-testid="bookmark-filter-checkbox"
              checked={showOnlyBookmarked}
              onChange={() => {
                setShowOnlyBookmarked(!showOnlyBookmarked);
                setCurrentPage(1); // reset to first page on filter change
              }}
            />
            Show only bookmarked
          </label>
        </div>

        {currentArticles.length === 0 ? (
          <p data-testid="no-articles-message">No articles to display.</p>
        ) : (
          currentArticles.map((article) => (
            <div
              key={article.id}
              className="article-card"
              data-testid={`article-card-${article.id}`}
            >
              <h3>
                {article.title}
                <span
                  className={`bookmark ${article.bookmarked ? "active" : ""}`}
                  onClick={() => toggleBookmark(article.id)}
                  data-testid={`bookmark-icon-${article.id}`}
                  role="button"
                  aria-label={`Bookmark toggle for ${article.title}`}
                  style={{ cursor: "pointer", marginLeft: "8px" }}
                >
                  ★
                </span>
              </h3>
              <p>{article.content}</p>
            </div>
          ))
        )}

        <div className="pagination" data-testid="pagination-controls">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            data-testid="prev-button"
          >
            Prev
          </button>
          <span data-testid="page-info">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            data-testid="next-button"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
