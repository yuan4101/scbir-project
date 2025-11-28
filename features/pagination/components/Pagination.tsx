"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const createPageURL = (page: number) => `/?page=${page}`;

  function getPageNumbers() {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    range.push(1);

    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i > 1 && i < totalPages) {
        range.push(i);
      }
    }

    if (totalPages > 1) {
      range.push(totalPages);
    }

    let prev = 0;
    for (const i of range) {
      if (prev) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    }

    return rangeWithDots;
  }

  const pages = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-2 mt-12 flex-wrap px-4">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <span className="hidden sm:inline">← Anterior</span>
        <span className="sm:hidden">←</span>
      </Link>

      <div className="flex gap-1 sm:gap-2">
        {pages.map((page, index) =>
          page === "..." ? (
            <span
              key={`dots-${index}`}
              className="px-2 sm:px-3 py-2 text-gray-500 font-semibold text-sm sm:text-base"
            >
              ...
            </span>
          ) : (
            <Link
              key={page}
              href={createPageURL(page as number)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-3 sm:px-4 py-2 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
          currentPage >= totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <span className="hidden sm:inline">Siguiente →</span>
        <span className="sm:hidden">→</span>
      </Link>
    </div>
  );
}
