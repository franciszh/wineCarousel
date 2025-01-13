export interface WineData {
    data: {
      search: {
        total: number;
        products: Product[];
      };
    };
  }
  
export interface Product {
    name: string;
    description: string;
    imageSrc: string;
    tag?: string;
    wasPrice?: {
        cashPrice: Price;
        pointsPrice: PointsPrice;
    };
    currentPrice: {
        cashPrice: Price;
        pointsPrice: PointsPrice;
    };
}
  
interface Price {
    currencyCode: string;
    amount: number;
}
  
interface PointsPrice {
    amount: number;
}