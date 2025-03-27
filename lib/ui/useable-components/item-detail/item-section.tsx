import { useState } from "react";

interface Option {
  _id: string;
  title: string;
  price: number;
}

interface SectionProps {
  title: string;
  options: Option[];
  name: string;
  onSelect: (selected: string) => void;
  multiple?: boolean;
}

export const ItemDetailSection: React.FC<SectionProps> = ({
  title,
  options,
  name,
  multiple = false,
}) => {
  //   const [selectedOption, setSelectedOption] = useState(options[0]);
  const [selectedOptions, setSelectedOptions] = useState<
    Option[] | Option | null
  >(multiple ? [] : null);

  const handleSelect = (option: Option) => {
    if (multiple) {
      setSelectedOptions((prevSelected) => {
        const exists = (prevSelected as Option[]).some(
          (o) => o._id === option._id
        );
        return exists ?
            (prevSelected as Option[]).filter((o) => o._id !== option._id)
          : [...(prevSelected as Option[]), option];
      });
    } else {
      setSelectedOptions(option);
    }
  };

  console.log({ selectedOptions });

  return (
    <div className="mb-4">
      <h3 className="font-inter font-bold text-[14px] md:text-[16px] lg:text-[18px] leading-[20px] md:leading-[22px]">
        {title}
      </h3>
      <div className="mt-2 space-y-2">
        {options.map((option) => (
          <label
            key={option._id}
            className="flex items-center gap-x-2 w-full cursor-pointer"
          >
            {/* Hidden Default Radio */}
            <input
              type={multiple ? "checkbox" : "radio"}
              name={name}
              checked={
                multiple ?
                  (selectedOptions as Option[]).some(
                    (o) => o._id === option._id
                  )
                : (selectedOptions as Option | null)?._id === option._id
              }
              onChange={() => handleSelect(option)}
              //   className="hidden peer"
            />

            {/* Custom Radio Button */}
            {/* <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-sky-500">
              <div className="w-2.5 h-2.5 bg-sky-500 rounded-full opacity-0  peer-checked:opacity-100"></div>
            </div> */}

            {/* <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-sky-500 transition-all">
              <div className="w-2.5 h-2.5 rounded-full bg-black  peer-checked:bg-sky-500 transition-transform" />
            </div> */}
            {/* Label & Price */}
            <div className="flex justify-between items-center w-full">
              <span className="text-sm text-gray-900">{option.title}</span>
              <span className="text-sm text-gray-700">${option.price}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
