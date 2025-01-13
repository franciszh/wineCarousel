import * as React from "react";
import Image from "next/image";
import shoppingCart from "@/public/shopping_cart.svg";

interface WineCardProps {
    cardLink: string;
    productName: string;
    productDescription: string;
    productImage: string;
    currentPriceCashAmount?: number;
    currentPriceCashCurrencyCode?: string;
    wasPriceCashAmount?: number;
    wasPriceCashCurrencyCode?: string;
    wasPricePoints?: number;
    productTag?: string;
    currentPricePoints?: number;
}

type WineCardCashBlockProps = Pick<WineCardProps, "currentPriceCashAmount" | "currentPriceCashCurrencyCode" | "wasPriceCashAmount" | "wasPriceCashCurrencyCode">

type WinCardPointsBlockProps = Pick<WineCardProps, "wasPricePoints" | "currentPricePoints">

const currencySymbolMap: Record<string, string> = {
    "AUD": "$"
};

const pointsUnit = "PTS";

const WineCardCashBlock = (props: WineCardCashBlockProps) => {
    const {currentPriceCashAmount, currentPriceCashCurrencyCode, wasPriceCashAmount, wasPriceCashCurrencyCode} = props;
    const currentCurrencySymbol = currentPriceCashCurrencyCode ? currencySymbolMap[currentPriceCashCurrencyCode] : "";
    const wasCurrencySymbol = wasPriceCashCurrencyCode ? currencySymbolMap[wasPriceCashCurrencyCode] : "";
    
    // two lines with wasPriceCash on the top
    if (wasPriceCashAmount) {
        const wasPrice = `${wasCurrencySymbol}${wasPriceCashAmount}`;
        const currentPrice = `${currentCurrencySymbol}${currentPriceCashAmount}`;
        return (
            <>
                <div aria-label={`It was ${wasPrice}.`} className="product-was-cash-wrapper">
                    {wasPrice}
                </div>
                <div aria-label={`Now only ${currentPrice}.`} className="product-current-cash-highlight">
                    {currentPrice}
                </div>
            </>
        )
    }
    // one line with currentPriceCash
    return (
        <div className="product-current-cash-normal">
            {`${currentCurrencySymbol}${currentPriceCashAmount}`}
        </div>
    )
    
}

const WineCardPointsBlock = (props: WinCardPointsBlockProps) => {
    const {wasPricePoints, currentPricePoints} = props;

    // two lines with currentPricePoints on the top
    if (wasPricePoints) {
        const currentPoints = `${currentPricePoints} ${pointsUnit}`;
        const wasPoints = `${wasPricePoints} ${pointsUnit}`;
        return (
            <>
                <div className="product-current-points-highlight">
                    <span className="product-current-points-or">
                        Or
                    </span>
                    <span aria-label={`With ${currentPoints} now.`} className="product-current-points">
                        {currentPoints}
                    </span>
                </div>
                <div aria-label={`Discounted from ${wasPoints}.`} className="product-was-points">
                    {wasPoints}
                </div>
            </>
        )
    }
    // one line with currentPricePoints
    return (
        <div className="product-current-points-normal">
            <span className="product-current-points-or">
                Or
            </span>
            <span className="product-current-points">
                {`${currentPricePoints} ${pointsUnit}`}
            </span>
        </div>
    )
}


export const WineCard = (props: WineCardProps) => {
    const { cardLink, productTag, productName, 
            productDescription, productImage, 
            currentPriceCashAmount, currentPriceCashCurrencyCode,
            wasPriceCashAmount, wasPriceCashCurrencyCode,
            wasPricePoints, currentPricePoints
        } = props;

    return (
        <div className="card-container">
            <a className="wrapping-link" href={cardLink} >
                {productTag && <div className="tag-wrapper"><span className="tag-text">{productTag}</span></div>}
                <div className="product-detail-wrapper">
                    <div className="product-detail-text-wrapper">
                        <h4 className="product-name">
                            {productName}
                        </h4>
                        <div className="product-description" title={productDescription}>
                            {productDescription}
                        </div>
                    </div>
                    <div className="product-image-wrapper">
                        <Image
                            src={productImage}
                            alt={`${productName} product image`}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div className="product-price-wrapper">
                    <div className="product-cash-wrapper">
                        <WineCardCashBlock {...{currentPriceCashAmount, currentPriceCashCurrencyCode, wasPriceCashAmount, wasPriceCashCurrencyCode}}/>
                    </div>
                    <div className="product-points-wrapper">
                        <WineCardPointsBlock {...{wasPricePoints, currentPricePoints}}/>
                    </div>
                </div>
            </a>
            <div className="add-to-cart-wrapper">
                <button type="button" className="add-to-cart-button" aria-label="Add to cart">
                    <span className="add-to-cart-text">ADD</span>
                    <Image src={shoppingCart} alt="Shopping cart icon"/>
                </button>
            </div>
        </div>
    );
}