import { useState } from "react";
import useUser from "@/lib/hooks/useUser";

// Interface
import {
  IAddon,
  IFoodItemDetalComponentProps,
  Option,
} from "@/lib/utils/interfaces";

// Components
import Divider from "../custom-divider";
import { ItemDetailSection } from "./item-section";

export default function FoodItemDetail(props: IFoodItemDetalComponentProps) {
  const { foodItem, addons, options, onClose } = props;

  // Access user context for cart functionality
  const { addItem } = useUser();

  // State for selected variation
  const [selectedVariation, setSelectedVariation] = useState(
    foodItem?.variations && foodItem.variations.length > 0
      ? foodItem.variations[0]
      : null
  );

  // State for quantity
  const [quantity, setQuantity] = useState(1);

  // State for selected addon options - use an object with addon IDs as keys
  const [selectedAddonOptions, setSelectedAddonOptions] = useState<
    Record<string, Option | Option[]>
  >({});

  // Get the addon objects for the selected variation
  const variationAddons =
    selectedVariation?.addons
      ?.map((addonId) => addons?.find((a) => a._id === addonId))
      .filter(Boolean) || [];

  // Function to get options for a specific addon
  const getAddonOptions = (addon: IAddon | undefined) => {
    return (
      addon?.options
        ?.map((optionId) => options?.find((o) => o._id === optionId))
        .filter(Boolean) || []
    );
  };

  // Handle selection for a specific addon
  const handleAddonSelection = (
    addonId: string,
    isMultiple: boolean,
    selection: Option | Option[]
  ) => {
    setSelectedAddonOptions((prev) => ({
      ...prev,
      [addonId]: selection,
    }));
  };

  // Validate if all required addons are selected
  const isFormValid = () => {
    // If no variation is selected, form is invalid
    if (!selectedVariation) return false;

    // Check if all required addons are selected
    for (const addon of variationAddons) {
      if (!addon) continue; // Skip if addon is undefined

      const selected = selectedAddonOptions[addon._id ?? ""];

      // Required addon check
      if (addon.quantityMinimum && addon.quantityMinimum > 0) {
        // For single select addons
        if (addon.quantityMinimum === 1 && addon.quantityMaximum === 1) {
          if (!selected) return false;
        }
        // For multi-select addons
        else {
          const selectedCount = selected
            ? Array.isArray(selected)
              ? selected.length
              : 1
            : 0;
          if (
            selectedCount < (addon.quantityMinimum ?? 0) ||
            selectedCount > (addon.quantityMaximum ?? Infinity)
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  // Function to add item to cart
  const handleAddToCart = () => {
    if (!isFormValid() || !foodItem || !selectedVariation) return;

    // Format addons for cart
    const formattedAddons = Object.entries(selectedAddonOptions)
      .filter(([_, value]) => value) // Filter out undefined/null values
      .map(([addonId, optionOrOptions]) => {
        // Handle both single and multi-select addons
        const options = Array.isArray(optionOrOptions)
          ? optionOrOptions.map((opt) => ({ _id: opt._id }))
          : [{ _id: optionOrOptions._id }];

        return {
          _id: addonId,
          options,
        };
      });

    // Call the addItem function from useUser hook
    addItem(
      foodItem._id,
      selectedVariation._id,
      foodItem.restaurant,
      quantity,
      formattedAddons,
      "" // Special instructions - could add a field for this
    );

    // Close the modal
    if (onClose) {
      onClose();
    }
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedVariation) return 0;

    let totalPrice = selectedVariation.price * quantity;

    // Add prices for selected addons
    Object.entries(selectedAddonOptions).forEach(([addonId, selected]) => {
      if (!selected) return;

      if (Array.isArray(selected)) {
        // Multiple selected options
        selected.forEach((option) => {
          totalPrice += option.price;
        });
      } else {
        // Single selected option
        totalPrice += selected.price;
      }
    });

    return totalPrice.toFixed(2);
  };

  return (
    <div className="bg-white max-w-md w-full">
      <div className="text-center mb-4">
        <img
          alt={foodItem?.title}
          className="w-full h-[150px] object-cover mx-auto"
          src={foodItem?.image}
        />
      </div>

      <h2 className="font-inter font-bold text-[#111827] text-[16px] md:text-[18px] lg:text-[19px] leading-[22px] md:leading-[24px]">
        {foodItem?.title}
      </h2>
      <p className="text-[#0EA5E9] font-[600] text-[14px] md:text-[15px] lg:text-[16px] mb-2">
        ${selectedVariation?.price.toFixed(2)}
      </p>
      <p className="font-inter font-normal text-gray-500 text-[12px] md:text-[13px] lg:text-[14px] leading-[18px] md:leading-[20px]">
        {foodItem?.description}
      </p>

      <Divider />

      <div id="addon-sections">
        {/* Variation Selection - With required tag */}
        {/* Variation Selection - With required tag */}
        {foodItem?.variations && foodItem.variations.length > 1 && (
          <ItemDetailSection
            key="variations"
            title="Select Variation"
            name="variation" // This is a string literal, no undefined issue
            singleSelected={selectedVariation}
            onSingleSelect={setSelectedVariation}
            options={foodItem?.variations || []}
            requiredTag="1 Required"
            showTag={true}
          />
        )}

        {/* Addon Sections - With required/optional tags */}
        {variationAddons.map((addon) => {
          if (!addon) return null; // Skip rendering if addon is undefined

          const isSingleSelect =
            addon.quantityMinimum === 1 && addon.quantityMaximum === 1;
          const addonOptions = getAddonOptions(addon);

          // Determine required/optional tag text
          const requiredTagText =
            (addon.quantityMinimum ?? 0) > 0
              ? `${addon.quantityMinimum} Required`
              : "Optional";

          return (
            <ItemDetailSection
              key={addon._id ?? "addon-" + Math.random()}
              title={addon.title ?? "Unknown"}
              name={addon._id ?? "addon"}
              multiple={!isSingleSelect}
              singleSelected={
                isSingleSelect
                  ? (selectedAddonOptions[addon._id ?? ""] as Option)
                  : null
              }
              onSingleSelect={
                isSingleSelect
                  ? (option) =>
                      handleAddonSelection(addon._id ?? "", false, option as Option)
                  : undefined
              }
              multiSelected={
                !isSingleSelect
                  ? (selectedAddonOptions[addon._id ?? ""] as Option[]) || []
                  : []
              }
              onMultiSelect={
                !isSingleSelect
                  ? (updateFn) => {
                      const current =
                        (selectedAddonOptions[addon._id ?? ""] as Option[]) ||
                        [];
                      if (typeof updateFn === "function") {
                        const updated = updateFn(current);
                        handleAddonSelection(addon._id ?? "", true, updated as Option[]);
                      }
                    }
                  : undefined
              }
              options={addonOptions as Option[]}
              requiredTag={requiredTagText}
              showTag={true}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-x-2 mt-4">
        {/* Quantity Controls - Rounded Rectangle Container */}
        <div className="flex items-center space-x-2 bg-gray-200 rounded-[42px] px-3 py-1 flex-[0.2]">
          <button
            className="bg-white text-gray-900 rounded-full w-6 h-6 flex items-center justify-center shadow"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            type="button"
          >
            -
          </button>
          <span className="text-lg font-medium text-gray-900">{quantity}</span>
          <button
            className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
            onClick={() => setQuantity((prev) => prev + 1)}
            type="button"
          >
            +
          </button>
        </div>

        {/* Add to Order Button - Takes Remaining 80% */}
        <button
          className={`${isFormValid() ? "bg-[#5AC12F]" : "bg-gray-300"} text-black px-4 py-2 text-[500] font-[14px] rounded-full flex items-center justify-between flex-[0.8]`}
          onClick={handleAddToCart}
          disabled={!isFormValid()}
          type="button"
        >
          Add to order
          <span className="ml-2 text-gray-900 text-[500] font-[14px]">
            ${calculateTotalPrice()}
          </span>
        </button>
      </div>
    </div>
  );
}