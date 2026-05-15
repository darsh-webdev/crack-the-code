import { useCallback, useMemo, useState } from "react";
import { Tree } from "./Tree";
import { treeData } from "./treeData";
import { collectExpandedIds, filterTree } from "./utils";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");

  const [expanded, setExpanded] = useState<Set<number>>(() => new Set());

  // Filtered tree
  const filteredTree = useMemo(() => {
    return filterTree(treeData, query);
  }, [query]);

  // Auto expand matching branches during search
  const autoExpanded = useMemo(() => {
    return query ? collectExpandedIds(filteredTree) : expanded;
  }, [query, filteredTree, expanded]);

  // Toggle expand manually
  const toggleExpand = useCallback((id: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }, []);

  return (
    <div className="container">
      <h1>Searchable Tree View</h1>

      <input
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search technologies..."
      />

      <div className="tree-wrapper">
        <Tree
          nodes={filteredTree}
          expanded={autoExpanded}
          toggleExpand={toggleExpand}
          query={query}
        />
      </div>
    </div>
  );
}

export default App;
