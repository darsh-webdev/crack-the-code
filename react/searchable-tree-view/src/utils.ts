import { type TreeNode } from "./types";

// Filter tree recursively
export function filterTree(nodes: TreeNode[], query: string): TreeNode[] {
  if (!query.trim()) return nodes;

  const lower = query.toLowerCase();

  const filteredNodes: Array<TreeNode | null> = nodes.map((node) => {
    const matches = node.label.toLowerCase().includes(lower);

    const filteredChildren = node.children
      ? filterTree(node.children, query)
      : undefined;

    if (matches || (filteredChildren?.length ?? 0) > 0) {
      return {
        ...node,
        ...(filteredChildren ? { children: filteredChildren } : {}),
      };
    }

    return null;
  });

  return filteredNodes.filter((node): node is TreeNode => node !== null);
}

// Collect all ids for auto-expand
export function collectExpandedIds(nodes: TreeNode[]): Set<number> {
  const ids = new Set<number>();

  const traverse = (items: TreeNode[]) => {
    for (const item of items) {
      ids.add(item.id);

      if (item.children) {
        traverse(item.children);
      }
    }
  };

  traverse(nodes);

  return ids;
}
