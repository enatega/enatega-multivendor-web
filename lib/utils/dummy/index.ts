export const DUMMY_BANNER_IMAGES_URL = [
  {
    alt: "Image 2",
    url: "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 3",
    url: "https://images.ctfassets.net/23u853certza/1FZ1mDc4bJVwtMTJz2Wtfa/71060334acbb1bbd9c1f270a94599fc2/photocard_merchant_v2.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 2",
    url: "https://images.ctfassets.net/23u853certza/0V5KYLmUImbVPRBerxy9b/78c9f84e09efbde9e124e74e6eef8fad/photocard_courier_v4.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 3",
    url: "https://images.ctfassets.net/23u853certza/5926qGJB2hSNE15qHWNLZn/388c6afaf9c273c328d6ec824f10b0e1/photocard_woltplus.jpg?w=960&q=90&fm=webp",
  },
  {
    alt: "Image 4",
    url: "https://images.ctfassets.net/23u853certza/471ILgDT92ZOsRUtayO8Gy/3653197562a27c83d18caa3fb4a12256/photocardsmall_wolt_market_v2.jpg?w=600&q=90&fm=webp",
  },
  {
    alt: "Image 5",
    url: "https://images.ctfassets.net/23u853certza/6Cv99BeTRgtrg88Ateht1U/3ea23a65fc86d6e5b7e606a58cf2b063/subhero_merchant.jpg?w=1920&q=90&fm=webp",
  },
];

export const DUMMY_PROFILE = {
  data: {
    profile: {
      _id: "67115a6aada1b30367539d35",
      name: "Helsinki FF",
      phone: "+921234567",
      phoneIsVerified: true,
      email: "demo-customer@enatega.com",
      emailIsVerified: true,
      notificationToken: null,
      isOrderNotification: false,
      isOfferNotification: false,
      addresses: [
        {
          _id: "67d84258951e3bddd9bb94ce",
          label: "House",
          deliveryAddress: "Arawi 1353, Cochabamba, Bolivia",
          details: "Arawi 1353, Cochabamba, Bolivia",
          location: {
            coordinates: [-66.1781745404005, -17.366869665858506],
            __typename: "Point",
          },
          selected: false,
          __typename: "Address",
        },
        {
          _id: "67dd08d854dbe316ce728769",
          label: "House",
          deliveryAddress:
            "V56W+M5 Qingshuiyixiang, Yuzhong County, Lanzhou, Gansu, China",
          details:
            "V56W+M5 Qingshuiyixiang, Yuzhong County, Lanzhou, Gansu, China",
          location: {
            coordinates: [104.19539691880345, 35.861659881016436],
            __typename: "Point",
          },
          selected: false,
          __typename: "Address",
        },
        {
          _id: "67dd0c9154dbe316ce7339f8",
          label: "Other",
          deliveryAddress:
            "6W6C+7GP, Sei Pinang, Mandau Talawang, Kapuas Regency, Central Kalimantan, Indonesia",
          details:
            "6W6C+7GP, Sei Pinang, Mandau Talawang, Kapuas Regency, Central Kalimantan, Indonesia",
          location: {
            coordinates: [113.92132703214884, -0.7892750509723557],
            __typename: "Point",
          },
          selected: false,
          __typename: "Address",
        },
        {
          _id: "67dd0cd354dbe316ce734a04",
          label: "Office",
          deliveryAddress:
            "Carr. C. 30, 24, Moncloa - Aravaca, 28035 Madrid, Spain",
          details: "Carr. C. 30, 24, Moncloa - Aravaca, 28035 Madrid, Spain",
          location: {
            coordinates: [-3.749219924211502, 40.46366700483249],
            __typename: "Point",
          },
          selected: false,
          __typename: "Address",
        },
        {
          _id: "67dd152e54dbe316ce740d65",
          label: "Other",
          deliveryAddress:
            "Australia Zoo, 1638 Steve Irwin Way, Beerwah QLD 4519, Australia",
          details:
            "Australia Zoo, 1638 Steve Irwin Way, Beerwah QLD 4519, Australia",
          location: {
            coordinates: [152.9631126858294, -26.835717796398036],
            __typename: "Point",
          },
          selected: false,
          __typename: "Address",
        },
        {
          _id: "67dd229754dbe316ce7573e3",
          label: "Office",
          deliveryAddress: "P28H+95P, E-8/1 E 8/1 E-8, Islamabad, Pakistan",
          details: "P28H+95P, E-8/1 E 8/1 E-8, Islamabad, Pakistan",
          location: {
            coordinates: [73.02784217521548, 33.71553302532409],
            __typename: "Point",
          },
          selected: true,
          __typename: "Address",
        },
      ],
      favourite: [
        "674ef9c670ca554aeb7827e3",
        "677e5b4c4a70d1252c816925",
        "67bbe748f4e06e23d7e4c305",
        "67da73542cf8311f09c6fbb4",
        "67da73792cf8311f09ccf85b",
        "67da6c062cf8311f095edb47",
      ],
      __typename: "User",
    },
  },
};
