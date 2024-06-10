"use client";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectUserLoggedIn } from '../utils/redux/slices/user.slice';
import { PAGES_ROUTES, PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/utils/routes';

function Guard({ children }: any) {
  const isLoggedIn = useSelector(selectUserLoggedIn);
  const router = useRouter();
  const pathname = usePathname();

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
    // if (!router.isReady) return;
    routeCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
}

export default Guard;
