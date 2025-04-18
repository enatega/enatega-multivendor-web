"use client";

import { useAuth } from "@/lib/context/auth/auth.context";
import AuthGuard from "@/lib/hoc/auth.guard";
import ProfileLayoutScreen from "@/lib/ui/layouts/protected/profile";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function ProfileRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authToken } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Handlers
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
    onHandleUserAuthenticate();
  }, [authToken]);

  const ProtectedLayout = AuthGuard(
    ({ children }: { children: React.ReactNode }) => {
      return <ProfileLayoutScreen>{children}</ProfileLayoutScreen>;
    }
  );

  return <ProtectedLayout>{children}</ProtectedLayout>;
}
