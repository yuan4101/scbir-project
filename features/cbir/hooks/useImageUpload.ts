import { useState, useRef } from "react";

export function useImageUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleFile(f: File) {
    if (!f.type.startsWith("image/")) {
      setError("El archivo debe ser una imagen");
      return;
    }
    if (f.size > 6 * 1024 * 1024) {
      setError("La imagen no debe superar 6MB");
      return;
    }
    setError(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) handleFile(f);
  }

  function onDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) handleFile(f);
  }

  function clear() {
    if (inputRef.current?.value) {
      inputRef.current.value = "";
    }
    setFile(null);
    setPreview(null);
    setError(null);
  }

  return {
    file,
    preview,
    error,
    inputRef,
    handleFile,
    onChange,
    onDrop,
    clear,
    setError,
  };
}
