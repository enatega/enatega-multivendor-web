"use client";

import ProfileHeader from "@/lib/ui/screen-components/protected/layout/profile/profile-header";
import ProfileTabs from "@/lib/ui/screen-components/protected/layout/profile/profile-tabs";
import { PaddingContainer } from "@/lib/ui/useable-components/containers";
import { IProtectedProfileLayoutComponent } from "@/lib/utils/interfaces";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";

export default function ProfileLayout({
  children,
}: IProtectedProfileLayoutComponent) {
  // const pathname = usePathname();
  const router = useRouter();
  const [user] = useState<boolean>(true);

  //initially temporarily setting user in state -after login functionality use usercontext here
  
  useLayoutEffect(() => {
    if (!user) {
      router.push("/discovery");
    }
  }, [user, router]);

  if (user) {
    return (
      <PaddingContainer>
        <div className="flex flex-col justify-center items-center py-4 px-4 md:px-0 ">
          <ProfileHeader/>
          {/* <div>Profile Header</div> */}
          <ProfileTabs />
        </div>
        <div className="flex-1 overflow-auto px-4 md:px-20 lg:px-40">
          {children}
        </div>
      </PaddingContainer>
    );
  }
}
