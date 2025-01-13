import React, { Suspense } from 'react';
import { WineCard } from "@/components/ui/wineCard";
import { Carousel } from "@/components/ui/carousel"
import { WineData } from "@/types/wineApi"


const API_URL = process.env.WINE_API_URL;

async function getWineData(): Promise<WineData> {
  // Assumption: wine data is not time-sensative so that the API fetch
  // is cached for 1 hour to reduce the server stress in the real production env
  const res = await fetch(API_URL!, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return await res.json();
}

export default async function WineCarousel() {
  // To do an error boundary to handle the thrown error
  const wineAPIData = await getWineData();
  

  return (
    <div className="main-container">
      <Carousel>
        { wineAPIData?.data?.search?.products?.map((product) => {
          const { name, description, imageSrc, tag, wasPrice, currentPrice} = product;
          // destruct currentPrice
          const { cashPrice: curCashPrice, pointsPrice: curPointsPrice } = currentPrice;
          const { amount: curCashAmount, currencyCode: curCashCode } = curCashPrice;
          const { amount: curPointsAmount } = curPointsPrice;
          // destruct optional wasPrice Object
          const { cashPrice: wasCashPrice, pointsPrice: wasPointsPrice } = wasPrice || {};
          const { amount: wasCashAmount, currencyCode: wasCashCode } = wasCashPrice || {};
          const { amount: wasPointsAmount } = wasPointsPrice || {};
          return (
            <div key={name} className="carousel-item-wrapper">
              <WineCard
                  cardLink="#" productName={name}
                  productDescription={description} productImage={imageSrc} productTag={tag}
                  currentPriceCashAmount={curCashAmount} currentPriceCashCurrencyCode={curCashCode}
                  currentPricePoints={curPointsAmount} wasPriceCashAmount={wasCashAmount}
                  wasPriceCashCurrencyCode={wasCashCode} wasPricePoints={wasPointsAmount}
                />
            </div> 
          );
        })}
      </Carousel>
    </div>
  );
}
