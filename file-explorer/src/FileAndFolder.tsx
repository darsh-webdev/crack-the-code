import { MdExpandLess, MdExpandMore, MdDeleteOutline } from "react-icons/md";
import { FiFolderPlus } from "react-icons/fi";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState } from "react";
import { type Structure } from "./App";

type FileAndFolderProps = {
  data: Structure[];
  onAdd: (id: number, isFolder: boolean) => void;
  onRemove: (id: number) => void;
};

const FileAndFolder = ({ data, onAdd, onRemove }: FileAndFolderProps) => {
  const [collapsed, setCollapsed] = useState({});
  return (
    <div>
      {data.map((item) => (
        <div style={{ paddingLeft: "20px", cursor: "pointer" }} key={item.id}>
          {item.isFolder ? (
            <>
              <div
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {collapsed[item.id] ? (
                  <MdExpandMore
                    size={20}
                    color="white"
                    onClick={() =>
                      setCollapsed((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                  />
                ) : (
                  <MdExpandLess
                    size={20}
                    color="white"
                    onClick={() =>
                      setCollapsed((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                  />
                )}
                <span>{item.name}</span>
                <FiFolderPlus size={15} onClick={() => onAdd(item.id, true)} />
                <AiOutlineFileAdd size={15} onClick={onAdd(item.id, false)} />
                <MdDeleteOutline size={15} onClick={() => onRemove(item.id)} />
              </div>
              {!collapsed[item.id] && item.children && (
                <FileAndFolder
                  data={item.children}
                  onAdd={onAdd}
                  onRemove={onRemove}
                />
              )}
            </>
          ) : (
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <span>{item.name}</span>
              <MdDeleteOutline size={15} onClick={() => onRemove(item.id)} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FileAndFolder;
