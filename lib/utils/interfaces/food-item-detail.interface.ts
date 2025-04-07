import { Dispatch, SetStateAction } from "react";
import { IGlobalComponentProps } from "./global.interface";
import { IAddon, IFood, IOption } from "./restaurants.interface";

export interface IFoodItemDetalComponentProps extends IGlobalComponentProps {
  foodItem: IFood | null;
  addons: IAddon[];
  options: IOption[];
}

export interface Option {
  _id: string;
  title: string;
  price: number;
}

export interface SectionProps<T extends { _id: string }> {
  title: string;
  options: T[];
  name: string;

  singleSelected?: T | null;
  multiSelected?: T[] | null;
  onSingleSelect?: Dispatch<SetStateAction<T | null>>;
  onMultiSelect?: Dispatch<SetStateAction<T[] | null>>;
  multiple?: boolean;
}
export interface AddonSectionProps<T extends { _id: string }> {
  title: string;
  addonOptions: T;
  name: string;

  multiSelected: T[] | null;
  onMultiSelect: Dispatch<SetStateAction<T[] | null>>;
  multiple?: boolean;
}
