// Interface
import { SectionProps, Option } from "@/lib/utils/interfaces";

/**
 * `ItemDetailSection` is a generic component that renders either radio buttons or checkboxes
 * based on the `multiple` prop. It supports single or multiple selection.
 *
 * @template T - The type of the option items, which must include an `_id` field.
 *
 * @param {string} title - The title of the section.
 * @param {T[]} options - The list of options to choose from.
 * @param {string} name - The name attribute for radio or checkbox inputs.
 * @param {boolean} [multiple=false] - If true, allows multiple selections.
 * @param {T | null} singleSelected - The currently selected option
 * @param {Dispatch<SetStateAction<T | null>>} onSingleSelect - Callback function when selection changes.
 * @param {T[] | null} multiSelected - The currently selected options
 * @param {Dispatch<SetStateAction<T | null>>} onMultiSelect - Callback function when multi-select changes
 *
 * @returns {JSX.Element} The rendered component.
 */

export const ItemDetailSection = <
  T extends { _id: string; title?: string | undefined; price: number },
>({
  title,
  options,
  name,
  multiple = false,
  singleSelected,
  onSingleSelect,
  multiSelected,
  onMultiSelect,
}: SectionProps<T>) => {
  const handleSelect = (option: T) => {
    if (multiple) {
      onMultiSelect &&
        onMultiSelect((prevSelected) => {
          const exists = (prevSelected as T[]).some(
            (o) => o._id === option._id
          );
          return exists ?
              (prevSelected as T[]).filter((o) => o._id !== option._id)
            : [...(prevSelected as T[]), option];
        });
    } else {
      onSingleSelect && onSingleSelect(option);
    }
  };

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
                multiple && multiSelected ?
                  multiSelected.some((o) => o._id === option._id)
                : (singleSelected as Option | null)?._id === option._id
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
