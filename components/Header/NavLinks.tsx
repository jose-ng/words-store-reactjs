import { useAuth } from "@hooks/useAuth";
import { selectUserLoggedIn } from "@utils/redux/slices/user.slice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function NavLinks({ onOptionHandler }: any) {
  const isUserLoggedIn = useSelector(selectUserLoggedIn);
  const { signOut } = useAuth();
  const pathname = usePathname();
  const activeLink =
    "text-white bg-blue-700 md:bg-transparent md:text-blue-700  dark:text-white md:dark:text-blue-500";
  const inactiveLink =
    "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <Link
          href="/words"
          className={`block md:p-0 py-2 px-3 rounded ${
            pathname === "/words"
              ? activeLink.toString()
              : inactiveLink.toString()
          }`}
          aria-current="page"
        >
          Words
        </Link>
      </li>
      <li>
        <Link
          href="/academy"
          className={`block md:p-0 py-2 px-3 rounded ${
            pathname === "/academy"
              ? activeLink.toString()
              : inactiveLink.toString()
          }`}
          aria-current="page"
        >
          Academy
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className={`block md:p-0 py-2 px-3 rounded ${
            pathname === "/about"
              ? activeLink.toString()
              : inactiveLink.toString()
          }`}
          aria-current="page"
        >
          About
        </Link>
      </li>
      {isUserLoggedIn ? (
        <>
          <li>
            <button
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              type="button"
              onClick={() => onOptionHandler("word")}
            >
              Add Word
            </button>
          </li>
          <li>
            <button
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              type="button"
              onClick={() => onOptionHandler("note")}
            >
              Add Note
            </button>
          </li>
          <li>
            <button
              className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              type="button"
              onClick={() =>
                signOut(() => {
                  window.location.href = "/";
                })
              }
            >
              Exit
            </button>
          </li>
        </>
      ) : (
        <li>
          <Link
            href="/login"
            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
          >
            Login
          </Link>
        </li>
      )}
    </ul>
  );
}

export { NavLinks };
