import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";

import cn from "../utils/cn";
import usePagination from "../hooks/usePagination";

export default function Pagination({ count, page }) {
  const { items } = usePagination({ count, page, boundaryCount: 2 });

  const next = items.find(({ type }) => type === "next");
  const previous = items.find(({ type }) => type === "previous");

  return (
    <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mb-6">
      <div className="-mt-px flex w-0 flex-1">
        {!previous.disabled && (
          <Link
            to={`/products/${previous.page}`}
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <MoveLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </Link>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {items
          .filter(({ type }) => !["next", "previous"].includes(type))
          .map((item) => {
            const text = item.type === "page" ? item.page : "...";
            const className = cn([
              "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
              item.selected && "border-indigo-500 text-indigo-600",
            ]);
            if (item.type === "page")
              return (
                <Link
                  className={className}
                  key={item.type + item.page}
                  to={`/products/${item.page}`}
                >
                  {text}
                </Link>
              );

            return (
              <button className={className} key={item.type + item.page}>
                {text}
              </button>
            );
          })}
        {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        {!next.disabled && (
          <Link
            to={`/products/${next.page}`}
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <MoveRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </Link>
        )}
      </div>
    </nav>
  );
}
