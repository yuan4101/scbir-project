"use client";

import Image from "next/image";

interface ImageModalProps {
  isOpen: boolean;
  image: string | null;
  modalRef: React.RefObject<HTMLDivElement | null>;
  onClose: () => void;
}

export function ImageModal({
  isOpen,
  image,
  modalRef,
  onClose,
}: ImageModalProps) {
  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div ref={modalRef} className="relative max-w-5xl max-h-[90vh] w-full">
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-4xl font-bold hover:text-gray-300 transition-colors z-10"
          aria-label="Cerrar modal"
        >
          ×
        </button>
        <div className="relative w-full h-full">
          <Image
            unoptimized
            src={image}
            alt="Vista ampliada"
            width={1200}
            height={800}
            className="object-contain w-full h-full rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}
