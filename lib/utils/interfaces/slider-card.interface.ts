import { IGlobalComponentProps } from "./global.interface";

export interface ISliderCardComponentProps<T> extends IGlobalComponentProps {
  title: string;
  data: T[];
}

export interface ISliderCardItemProps {
  name: string;
  category: string;
  image: string;
  deliveryTime: string;
  time: string;
  reviews: string;
  rating: string;
}
