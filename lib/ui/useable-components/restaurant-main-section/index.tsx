// core
import React from "react";
// card component
import Card from "@/lib/ui/useable-components/card";
// loading skeleton
import SliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/slider.loading.skeleton";
// interface
import { IMainSectionProps } from "@/lib/utils/interfaces";
// hooks
import { useSearchUI } from "@/lib/context/search/search.context";
import CustomButton from "../button";
import { useRouter } from "next/navigation";
import { saveSearchedKeyword } from "@/lib/utils/methods";

function MainSection({ title, data, error, loading, search}: IMainSectionProps) {
  const router= useRouter()
  const { isSearchFocused, setIsSearchFocused, filter } = useSearchUI();
  
  if (error) {
    return;
  }
  if (loading) {
    return <SliderSkeleton />;
  }

  // see all button handler
  const onSeeAllClick = () => {
    setIsSearchFocused(false);
    saveSearchedKeyword(filter);
    // Extract the keyword after the colon, trim, and slugify
    const keyword = title?.split(":")[1]?.trim().toLowerCase().replace(/\s+/g, "-");
  
    if (keyword) {
      router.push(`/search/${keyword}`);
    }
  };
  
  
  return (
    <div className="mb-20">
      <div className="mx-[6px] flex items-center gap-4 justify-between">
        <span className="font-inter font-bold text-xl sm:text-2xl leading-8 tracking-normal text-gray-900">
          {title}
        </span>
        {search && (
          <CustomButton
          label="See all"
          onClick={onSeeAllClick}
          className="text-[#0EA5E9] transition-colors duration-200 text-sm md:text-base"
        />
        )}
      </div>

      <div className={`grid grid-cols-1 gap-2 mt-4 items-center ${isSearchFocused ? 'sm:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
        {data?.map((item) => {
          return <Card key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
}

export default MainSection;
