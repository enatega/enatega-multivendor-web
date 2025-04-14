import { IGlobalComponentProps } from "./global.interface";
import { ILocation } from "./google.map.interface";

export interface ILocationProvider extends IGlobalComponentProps {}

export interface ILocationContext {
  location: ILocation | null;
  setLocation: React.Dispatch<React.SetStateAction<ILocation | null>>;
}
