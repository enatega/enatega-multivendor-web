import ProfileDetailsSkeleton from "@/lib/ui/useable-components/custom-skeletons/profile.details.skelton";
import TextComponent from "@/lib/ui/useable-components/text-field";
import { DUMMY_PROFILE } from "@/lib/utils/dummy";
import { getInitials } from "@/lib/utils/methods";
import { useEffect, useState } from "react";

export default function PersonalInfoMain() {
  const [loading, setLoading] = useState<boolean>(true);
  // Get initials from the name
  const initials = getInitials(DUMMY_PROFILE?.data?.profile?.name);
  console.log(DUMMY_PROFILE);

  //   Remove this use effect and handcoded loading usestate after Realldata fatching implementation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  if (!loading) {
    return (
      <div className="p-6 w-full bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 mb-6">
          {/* Custom Avatar with Tailwind */}
          <div className="relative h-16 w-16 flex-shrink-0 bg-[#F3FFEE] rounded-full border-2 border-white shadow-sm shadow-gray-400">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary text-sm font-medium text-gray-500">
              {initials}
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {DUMMY_PROFILE?.data?.profile?.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div>
            <TextComponent text="Email" className="text-black font-semibold" />
            <TextComponent
              text={DUMMY_PROFILE?.data?.profile?.email}
              className=""
            />
          </div>
          <div>
            <TextComponent
              text="Phone number"
              className="text-black font-semibold"
            />
            <TextComponent
              text={DUMMY_PROFILE?.data?.profile?.phone}
              className=""
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <ProfileDetailsSkeleton />;
  }
}
