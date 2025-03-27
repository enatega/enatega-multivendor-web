
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