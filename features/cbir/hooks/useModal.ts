import { useState, useRef, useEffect } from "react";

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        close();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function open(imagen: string) {
    setSelectedImage(imagen);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setSelectedImage(null);
  }

  return {
    isOpen,
    selectedImage,
    modalRef,
    open,
    close,
  };
}
