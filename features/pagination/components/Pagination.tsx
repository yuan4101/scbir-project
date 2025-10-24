"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const createPageURL = (page: number) => `/?page=${page}`;

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          currentPage <= 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        ← Anterior
      </Link>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={createPageURL(page)}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              currentPage === page
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          currentPage >= totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Siguiente →
      </Link>
    </div>
  );
}
