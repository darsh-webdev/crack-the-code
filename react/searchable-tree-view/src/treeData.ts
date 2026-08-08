import { type TreeNode } from "./types";

export const treeData: TreeNode[] = [
  {
    id: 1,
    label: "Frontend",
    children: [
      {
        id: 2,
        label: "React",
        children: [
          { id: 3, label: "Hooks" },
          { id: 4, label: "Context API" },
          { id: 5, label: "React Query" },
        ],
      },
      {
        id: 6,
        label: "Vue",
        children: [
          { id: 7, label: "Pinia" },
          { id: 8, label: "Nuxt" },
        ],
      },
    ],
  },
  {
    id: 9,
    label: "Backend",
    children: [
      {
        id: 10,
        label: "Node.js",
        children: [
          { id: 11, label: "Express" },
          { id: 12, label: "NestJS" },
        ],
      },
      {
        id: 13,
        label: "Databases",
        children: [
          { id: 14, label: "PostgreSQL" },
          { id: 15, label: "MongoDB" },
        ],
      },
    ],
  },
];
