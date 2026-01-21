import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
    currentPage,
    totalPages,
    baseUrl = "/"
}: {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
}) {
    if (totalPages <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return (
        <div className="flex justify-center items-center gap-6 mt-16 text-neutral-400 font-mono text-sm">
            {prevPage ? (
                <Link
                    href={`${baseUrl}?page=${prevPage}`}
                    className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                </Link>
            ) : (
                <span className="flex items-center gap-1 opacity-50 cursor-not-allowed">
                    <ChevronLeft size={16} />
                    <span>Prev</span>
                </span>
            )}

            <div className="bg-neutral-900 border border-neutral-800 px-4 py-1.5 rounded-full text-neutral-300">
                {currentPage} / {totalPages}
            </div>

            {nextPage ? (
                <Link
                    href={`${baseUrl}?page=${nextPage}`}
                    className="flex items-center gap-1 hover:text-emerald-400 transition-colors"
                >
                    <span>Next</span>
                    <ChevronRight size={16} />
                </Link>
            ) : (
                <span className="flex items-center gap-1 opacity-50 cursor-not-allowed">
                    <span>Next</span>
                    <ChevronRight size={16} />
                </span>
            )}
        </div>
    );
}
