import { Dispatch, SetStateAction } from "react";
import { IGlobalComponentProps } from "./global.interface";

export interface IFoodItemDetalComponentProps extends IGlobalComponentProps {}

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
