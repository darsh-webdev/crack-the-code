export type UploadProgressCallback = (progress: number) => void;

export function uploadFile(
  file: File,
  signal: AbortSignal,
  onProgress: UploadProgressCallback,
): Promise<void> {
  return new Promise((resolve, reject) => {
    let progress = 0;

    const interval = setInterval(() => {
      if (signal.aborted) {
        clearInterval(interval);
        reject(new DOMException("Upload aborted", "AbortError"));
        return;
      }

      progress += Math.random() * 15;

      if (progress >= 100) {
        progress = 100;
        onProgress(progress);
        clearInterval(interval);

        // simulate random failure
        if (Math.random() < 0.2) {
          reject(new Error("Upload failed"));
        } else {
          resolve();
        }
        return;
      }

      onProgress(progress);
    }, 300);

    signal.addEventListener("abort", () => {
      clearInterval(interval);
      reject(new DOMException("Upload aborted", "AbortError"));
    });
  });
}
