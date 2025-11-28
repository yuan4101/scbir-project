import { useState } from "react";
import type { CarroConSimilitud } from "@/features/cbir/types/cbirTypes";

export function useCarroDetail() {
  const [selectedCarro, setSelectedCarro] = useState<CarroConSimilitud | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  function open(carro: CarroConSimilitud) {
    setSelectedCarro(carro);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setTimeout(() => setSelectedCarro(null), 300);
  }

  return {
    selectedCarro,
    isOpen,
    open,
    close,
  };
}
