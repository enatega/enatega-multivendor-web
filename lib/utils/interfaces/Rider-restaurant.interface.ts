export interface Cards {
  image: string;
  heading: string;
  text: string;
  color:string;
}

export interface WhyCardsListProps {
  cards: Cards[];
}

export interface sideCardProps{
  image:string,
  heading:string,
  subHeading:string,
  }
  
  
 export interface sideCardList{
    sideCards:sideCardProps[]
  }