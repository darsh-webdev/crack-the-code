import { useState } from "react";
import "./App.css";

const ARTICLES_PER_PAGE = 5;

// TODO: Implement this function
// function generateDummyArticles(count) → returns an array of article objects
// Each article: { id, title, content, bookmarked: false }
function generateDummyArticles(count) {
  // TODO
  return [];
}

function App() {
  // TODO: State
  const [articles, setArticles] = useState(generateDummyArticles(23)); // TODO: adjust initial articles if needed
  const [currentPage, setCurrentPage] = useState(1); // current page of pagination
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false); // filter flag

  // TODO: Function toggleBookmark(id)
  function toggleBookmark(id: number) {
    // TODO: flip bookmarked property of article with given id
  }

  // TODO: Function getFilteredArticles()
  function getFilteredArticles() {
    // TODO: filter articles based on showOnlyBookmarked
    return articles;
  }

  // TODO: Calculate total pages
  const totalPages = Math.ceil(
    getFilteredArticles().length / ARTICLES_PER_PAGE
  );

  // TODO: Function getCurrentArticles()
  function getCurrentArticles() {
    const filtered = getFilteredArticles();
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    // TODO: slice filtered array for current page
    return filtered.slice(startIndex, startIndex + ARTICLES_PER_PAGE);
  }

  const currentArticles = getCurrentArticles();

  // TODO: Function goToPage(page)
  function goToPage(page: number) {
    // TODO: clamp page between 1 and totalPages
    const newPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(newPage);
  }

  return (
    <div className="paginated-container" data-testid="paginated-container">
      <div className="header" data-testid="header">
        <h2>Articles</h2>
        <label htmlFor="bookmark-filter">
          <input
            id="bookmark-filter"
            type="checkbox"
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
  );
}

export default App;
