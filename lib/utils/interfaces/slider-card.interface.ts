import { IGlobalComponentProps } from "./global.interface";

export interface ISliderCardComponentProps<T> extends IGlobalComponentProps {
  title: string;
  data: T[];
}

export interface ISliderCardItemProps {
  _id: string;
  name: string;
  category: string;
  image: string;
  deliveryTime: number;
  time: string;
  reviews: string;
  rating: string;
  cuisines: string[];
  commissionRate: number;
  tax: number;
  reviewAverage: number;
}

export interface ICardProps {
  item: ISliderCardItemProps;
}
