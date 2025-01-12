import * as React from "react";
import Image from "next/image";

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
                <div aria-label={`It was ${wasPrice}.`}>
                    {wasPrice}
                </div>
                <div aria-label={`Now only ${currentPrice}.`}>
                    {currentPrice}
                </div>
            </>
        )
    }
    // one line with currentPriceCash
    return (
        <>
            <div>
                {`${currentCurrencySymbol}${currentPriceCashAmount}`}
            </div>
        </>
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
                <div>
                    <span>
                        Or
                    </span>
                    <span aria-label={`With ${currentPoints} now.`}>
                        {currentPoints}
                    </span>
                </div>
                <div aria-label={`Discounted from ${wasPoints}.`}>
                    {wasPoints}
                </div>
            </>
        )
    }
    // one line with currentPricePoints
    return (
        <>
            <div>
                <span>
                    Or
                </span>
                <span>
                    {`${currentPricePoints} ${pointsUnit}`}
                </span>
            </div>
        </>
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
                <div>
                    <h4>
                        {productName}
                    </h4>
                    <div>
                        {productDescription}
                    </div>
                    <div>
                        <Image
                            src={productImage}
                            alt={`${productName} product image`}
                            width={200}
                            height={200}
                        />
                    </div>
                </div>
                <div>
                    <div>
                        <WineCardCashBlock {...{currentPriceCashAmount, currentPriceCashCurrencyCode, wasPriceCashAmount, wasPriceCashCurrencyCode}}/>
                    </div>
                    <div>
                        <WineCardPointsBlock {...{wasPricePoints, currentPricePoints}}/>
                    </div>
                </div>
            </a>
            <div>
                <button type="button">
                    <span>ADD</span>
                </button>
            </div>
        </div>
    );
}