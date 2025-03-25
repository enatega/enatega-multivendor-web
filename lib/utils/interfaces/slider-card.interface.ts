import { IGlobalComponentProps } from "./global.interface";

export interface ISliderCardComponentProps extends IGlobalComponentProps {
  title: string;
  data: any;
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
