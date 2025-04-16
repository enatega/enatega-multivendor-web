export interface IAppBarProps {
  handleModalToggle: () => void;
}
export interface IAuthModalProps {
  isAuthModalVisible: boolean;
  handleModalToggle: () => void;
}

interface Point {
  coordinates: [number, number];
}

export interface IUserAddress {
  _id: string;
  location?: Point; // optional if it can be null
  deliveryAddress: string;
  details?: string;
  label: string;
  selected?: boolean;
}

export interface IUserAddressProps {
  userAddress: IUserAddress | null;
  setUserAddress: (address: IUserAddress | null) => void;
}

export interface IUserAddressComponentProps {
  id?: string;
  visible: boolean;
  onHide: () => void;
}
