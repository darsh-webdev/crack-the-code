import { memo } from "react";
import { type TreeNode } from "./types";

type TreeProps = {
  nodes: TreeNode[];
  expanded: Set<number>;
  toggleExpand: (id: number) => void;
  query: string;
};

function highlight(text: string, query: string) {
  if (!query.trim()) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const start = lowerText.indexOf(lowerQuery);

  if (start === -1) return text;

  const end = start + query.length;

  return (
    <>
      {text.slice(0, start)}
      <span className="highlight">{text.slice(start, end)}</span>
      {text.slice(end)}
    </>
  );
}

function TreeComponent({ nodes, expanded, toggleExpand, query }: TreeProps) {
  return (
    <ul className="tree">
      {nodes.map((node) => {
        const hasChildren = !!node.children && node.children.length > 0;

        const isExpanded = expanded.has(node.id);

        return (
          <li key={node.id}>
            <div className="node-row">
              {hasChildren ? (
                <button
                  className="toggle-btn"
                  onClick={() => toggleExpand(node.id)}
                >
                  {isExpanded ? "−" : "+"}
                </button>
              ) : (
                <span className="placeholder" />
              )}

              <span>{highlight(node.label, query)}</span>
            </div>

            {hasChildren && isExpanded && (
              <TreeComponent
                nodes={node.children ?? []}
                expanded={expanded}
                toggleExpand={toggleExpand}
                query={query}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export const Tree = memo(TreeComponent);
