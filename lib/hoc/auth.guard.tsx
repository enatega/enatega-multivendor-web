"use client";
// Core
import { useLayoutEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Hooks
import { useAuth } from "../context/auth/auth.context";

const AuthGuard = <T extends object>(Component: React.ComponentType<T>) => {
  const WrappedComponent = (props: T) => {
    const router = useRouter();
    const pathname = usePathname();
    const { authToken } = useAuth();

    const onHandleUserAuthenticate = () => {
      try {
        if (!authToken) {
          const previousUrl = document.referrer;
          const isSameOrigin = previousUrl.startsWith(window.location.origin);
          const previousPath =
            isSameOrigin ? new URL(previousUrl).pathname : null;

          if (previousPath && previousPath !== pathname) {
            router.back();
          } else {
            router.push("/");
          }
        }
      } catch (err) {
        router.replace("/");
      }
    };

    useLayoutEffect(() => {
      // Check if logged in
      onHandleUserAuthenticate();
    }, []);

    return !authToken ? <></> : <Component {...props} />;
  };

  return WrappedComponent;
};

export default AuthGuard;
