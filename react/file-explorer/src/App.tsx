import { useState } from "react";
import FileAndFolder from "./FileAndFolder";
import "./App.css";

export type Structure = {
  id: number;
  name: string;
  isFolder: boolean;
  children?: Structure[];
};

type ModalInfo = {
  parentId: number | null;
  isFolder: boolean;
};

const initialData: Structure[] = [
  {
    id: 1,
    name: "public",
    isFolder: true,
    children: [{ id: 2, name: "index.html", isFolder: false }],
  },
  {
    id: 3,
    name: "src",
    isFolder: true,
    children: [
      { id: 4, name: "App.js", isFolder: false },
      { id: 5, name: "index.js", isFolder: false },
    ],
  },
  { id: 6, name: "package.json", isFolder: false },
];

function App() {
  const [data, setData] = useState(initialData);
  const [idCounter, setIdCounter] = useState<number>(7);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    parentId: null,
    isFolder: false,
  });
  const [input, setInput] = useState("");

  const openModal = (parentId: number, isFolder: boolean) => {
    setModalInfo({ parentId, isFolder });
    setInput("");
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    const { parentId, isFolder } = modalInfo;
    const name = input.trim();
    if (!name) return;

    const newItem = {
      id: idCounter,
      name,
      isFolder,
      ...(isFolder ? { children: [] } : {}),
    };

    const updateTree = (nodes: Structure[]): Structure[] =>
      nodes.map((node) => {
        if (node.id === parentId && node.isFolder) {
          return { ...node, children: [...(node.children || []), newItem] };
        } else if (node.children) {
          return { ...node, children: updateTree(node.children) };
        }

        return node;
      });

    setData(updateTree(data));
    setIdCounter((prev) => prev + 1);
    setShowModal(false);
  };

  const handleRemove = (itemId: number) => {
    const deleteNode = (nodes: Structure[]): Structure[] =>
      nodes
        .filter((node) => node.id !== itemId)
        .map((node) =>
          node?.children
            ? { ...node, children: deleteNode(node.children) }
            : node,
        );

    setData(deleteNode(data));
  };

  return (
    <div>
      <h2>File Explorer</h2>
      <FileAndFolder data={data} onAdd={openModal} onRemove={handleRemove} />
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Enter {modalInfo.isFolder ? "folder" : "file"}</h3>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button onClick={handleModalSubmit}>Add</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
