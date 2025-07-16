// Features:
// Nested File Folder Structure
// Expand and Collapse Folders
// Add/Remove - File/Folder

import { useState } from "react";
import {
  FaChevronRight,
  FaChevronDown,
  FaFolderPlus,
  FaFileCirclePlus,
} from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./App.css";
import json from "./data.json";

interface ExplorerDataItem {
  id: number;
  name: string;
  isFolder: boolean;
  children?: ExplorerDataItem[];
}

type ExplorerData = ExplorerDataItem[];

type ExpandedState = { [key: number]: boolean };

const Sidebar = ({
  data,
  addNodeToList,
  deleteNodeFromList,
}: {
  data: ExplorerData;
  addNodeToList: (parentId: number, folder: boolean) => void;
  deleteNodeFromList: (itemId: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState<ExpandedState>({});

  return (
    <div className="container">
      {data.map((node) => (
        <div key={node.id}>
          <div className="explorer-item">
            {node.isFolder && (
              <span
                onClick={() =>
                  setIsExpanded((prev) => ({
                    ...prev,
                    [node.id]: !prev[node.id],
                  }))
                }
              >
                {isExpanded?.[node.id] ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            )}
            <span>{node.name}</span>
            <div className="action-btns">
              {node.isFolder ? (
                <>
                  <button onClick={() => addNodeToList(node.id, true)}>
                    <FaFolderPlus size={15} />
                  </button>
                  <button onClick={() => addNodeToList(node.id, false)}>
                    <FaFileCirclePlus size={15} />
                  </button>
                  <button onClick={() => deleteNodeFromList(node.id)}>
                    <MdDelete size={20} style={{ margin: 0, padding: 0 }} />
                  </button>
                </>
              ) : (
                <button onClick={() => deleteNodeFromList(node.id)}>
                  <MdDelete size={20} style={{ margin: 0, padding: 0 }} />
                </button>
              )}
            </div>
          </div>
          {isExpanded?.[node.id] && node?.children && (
            <Sidebar
              data={node.children}
              addNodeToList={addNodeToList}
              deleteNodeFromList={deleteNodeFromList}
            />
          )}
        </div>
      ))}
    </div>
  );
};

function App() {
  const [data, setData] = useState<ExplorerData>(json);

  const addNodeToList = (parentId: number, folder: boolean) => {
    const name = prompt("Enter name");
    if (name?.trim() === "") {
      alert("Name cannot be empty");
      return;
    }
    const updateList = (list: ExplorerData): ExplorerData => {
      return list.map((node: ExplorerDataItem) => {
        if (node.id === parentId) {
          return {
            ...node,
            ...(node.children && {
              children: [
                ...node.children,
                {
                  id: Date.now(),
                  isFolder: folder,
                  name: name!,
                  ...(folder && { children: [] }),
                },
              ],
            }),
          };
        }

        if (node.children) {
          return { ...node, children: updateList(node.children) };
        }

        return node;
      });
    };

    setData((prev) => updateList(prev));
  };

  const deleteNodeFromList = (itemId: number) => {
    const updateList = (list: ExplorerData): ExplorerData => {
      return list
        .filter((node) => node.id !== itemId)
        .map((node) => {
          if (node.children) {
            return { ...node, children: updateList(node.children) };
          }

          return node;
        });
    };
    setData((prev) => updateList(prev));
  };

  return (
    <div>
      <h1>File/Folder Explorer - Sidebar</h1>
      <Sidebar
        data={data}
        addNodeToList={addNodeToList}
        deleteNodeFromList={deleteNodeFromList}
      />
    </div>
  );
}

export default App;
