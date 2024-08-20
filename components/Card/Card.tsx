import Link from "next/link";
import React from "react";

function Card({ item, isLoggedIn, list }: any) {
  const { text_en, text_es }: { text_en: string; text_es: string } = item;
  return (
    <div className="flex px-3 py-1 text-base text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white mb-1 items-center flex-wrap">
      {isLoggedIn && <span className="material-icons">drag_handle</span>}
      <Link
        href={`/word/${item.id}`}
        scroll={true}
        className="pl-2 flex flex-wrap flex-col flex-1"
      >
        <span className="flex items-center flex-wrap">
          <span>{text_en}</span>: <span>{text_es}</span>
        </span>
        {list && list.lenght && (
          <ul className="text-end">
            <li className="inline-flex py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              Popular
            </li>
            <li className="inline-flex  px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              Popular
            </li>
          </ul>
        )}
      </Link>
    </div>
  );
}

export { Card };
