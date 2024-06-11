"use client";
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '../utils/redux/slices/user.slice';
import { PAGES_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from '@utils/routes';

function Guard({ children }: any) {
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routeCheck = () => {
    if (!isLoggedIn && pathname.includes(PRIVATE_ROUTES[0]))
      router.push(
        PAGES_ROUTES.login.default + "?redirect=" + pathname,
      );
    else if (
      isLoggedIn &&
      pathname.includes(PUBLIC_ROUTES[3])
    )
      router.push(
        PAGES_ROUTES.home.default,
      );
  };

  useEffect(() => {
    routeCheck();
    console.log('Guard');
  }, [pathname, searchParams]);
  return children;
}

export { Guard };
