import { useState } from "react";
import "./App.css";

const initialTree = [
  {
    id: "1",
    name: "Root",
    type: "folder",
    children: [
      { id: "2", name: "File1.txt", type: "file" },
      {
        id: "3",
        name: "Folder1",
        type: "folder",
        children: [{ id: "4", name: "File2.txt", type: "file" }],
      },
    ],
  },
];

function TreeNode({
  node,
  selectedIds,
  toggleCheckbox,
  toggleFolder,
  expandedIds,
}) {
  const isFolder = node.type === "folder";
  const isExpanded = expandedIds.has(node.id);

  return (
    <div className={`node ${node.type}`} data-testid={`node-${node.id}`}>
      <div className="node-content">
        {isFolder && (
          <button
            onClick={() => toggleFolder(node.id)}
            data-testid={`toggle-${node.id}`}
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        )}
        <input
          type="checkbox"
          checked={selectedIds.has(node.id)}
          onChange={() => toggleCheckbox(node, !selectedIds.has(node.id))}
          data-testid={`checkbox-${node.id}`}
        />
        <span>{node.name}</span>
      </div>
      {isFolder && isExpanded && node.children && (
        <div className="children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedIds={selectedIds}
              toggleCheckbox={toggleCheckbox}
              toggleFolder={toggleFolder}
              expandedIds={expandedIds}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  // State for selectedIds and expandedIds
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [expandedIds, setExpandedIds] = useState(new Set(["1"])); // Root expanded by default

  // Placeholder: Implement toggleFolder logic
  const toggleFolder = (id) => {
    // TODO: Implement folder expansion/collapse logic
    // Example: setExpandedIds((prev) => {...})
  };

  // Placeholder: Implement toggleCheckbox logic
  const toggleCheckbox = (node, checked) => {
    // TODO: Implement checkbox toggle logic
    // Example: setSelectedIds((prev) => {...})
  };

  return (
    <div className="tree-container" data-testid="tree-container">
      <h1>Folder Navigation</h1>
      {initialTree.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedIds={selectedIds}
          toggleCheckbox={toggleCheckbox}
          toggleFolder={toggleFolder}
          expandedIds={expandedIds}
        />
      ))}
    </div>
  );
}

export default App;
