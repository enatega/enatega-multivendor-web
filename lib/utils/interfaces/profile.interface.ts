
export interface ISingleAddress {
        _id: string;
        label: string;
        deliveryAddress: string;
        details: string;
        location: {
            coordinates: [string, string];
        };
        selected: boolean;
}

export interface IAddresses {
    addresses: ISingleAddress[];
}

export interface IProfileResponse extends IAddresses {
    profile: {
        _id: string;
        name: string;
        phone: string;
        phoneIsVerified: boolean;
        email: string;
        emailIsVerified: boolean;
        notificationToken: string;
        isActive: boolean;
        isOrderNotification: boolean;
        isOfferNotification: boolean;
       
        favourite: string[];
    };
}

export interface IAddressItemProps {
  address: { _id: string; label: string; details: string };
  activeDropdown: string | null;
  toggleDropdown: (id: string) => void;
  handleDelete: (id: string) => void;
  setDropdownRef: (id: string) => (el: HTMLDivElement | null) => void;
}


export interface IDeleteAccountDialogProps {
    visible: boolean
    onHide: () => void
    onConfirm: () => void
    userName?: string
    deleteReason?: string
    setDeleteReason?: (reason: string) => void
    loading?: boolean
  }
  