export interface IBannerItemProps {
  item: {
    file: string;
    title: string;
    description: string;
  }
}

export interface IBanner {
  __typename?: string;
  _id: string;
  title: string;
  description: string;
  action: string;
  screen: string;
  file: string;
  parameters?: string[];
}

export interface IGetBannersResponse {
  banners: IBanner[];
}