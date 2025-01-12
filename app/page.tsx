import { WineCard } from "@/components/ui/wineCard"

const baseProps = {
  cardLink: "#",
  productName: "Royal Solute",
  productDescription: "Royal Salute 21 Year Old Blended Scotch Whisky Miami Polo Edition 700ml (Gift Box)",
  productImage: "https://unsplash.it/200/200/?random",
  currentPriceCashAmount: 500,
  currentPriceCashCurrencyCode: "AUD",
  wasPriceCashAmount: 600,
  wasPriceCashCurrencyCode: "AUD",
  wasPricePoints: 50000,
  productTag: "Sale",
  currentPricePoints: 40000
};

export default function WineCarousel() {
  return (
    <div className="main-container">
      <WineCard {...baseProps}/>
    </div>
  );
}
