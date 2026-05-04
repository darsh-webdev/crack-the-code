import { useRef, useState } from "react";
import "./App.css";
import { uploadFile } from "./mockUpload";

type UploadStatus = "idle" | "uploading" | "success" | "error";

export default function App() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  const startUpload = async () => {
    if (!file) return;

    const controller = new AbortController();
    abortRef.current = controller;

    setStatus("uploading");
    setProgress(0);
    setError(null);

    try {
      await uploadFile(file, controller.signal, (p) => {
        setProgress(Math.round(p));
      });

      setStatus("success");
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setStatus("idle");
        return;
      }

      const message = err instanceof Error ? err.message : "Unknown error";

      setError(message);
      setStatus("error");
    }
  };

  const cancelUpload = () => {
    abortRef.current?.abort();
  };

  const reset = () => {
    setFile(null);
    setProgress(0);
    setStatus("idle");
    setError(null);
  };

  return (
    <div className="container">
      <h1>File Upload</h1>

      <input
        type="file"
        onChange={(e) => {
          const selected = e.target.files?.[0] ?? null;
          setFile(selected);
        }}
      />

      {file && <p className="file-name">{file.name}</p>}

      <div className="controls">
        <button
          onClick={startUpload}
          disabled={!file || status === "uploading"}
        >
          Upload
        </button>

        <button onClick={cancelUpload} disabled={status !== "uploading"}>
          Cancel
        </button>

        <button onClick={reset}>Reset</button>
      </div>

      {status === "uploading" && (
        <div className="progress-wrapper">
          <div className="progress-bar" style={{ width: `${progress}%` }} />
          <span>{progress}%</span>
        </div>
      )}

      {status === "success" && <p className="success">Upload successful 🎉</p>}

      {status === "error" && <p className="error">Error: {error}</p>}
    </div>
  );
}
