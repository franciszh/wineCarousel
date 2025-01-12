import { render } from "@testing-library/react";
import { WineCard } from "@/components/ui/wineCard";

const baseProps = {
    cardLink: "#",
    productName: "Royal Solute",
    productDescription: "Royal Salute 21 Year Old Blended Scotch Whisky Miami Polo Edition 700ml (Gift Box)",
    productImage: "https://unsplash.it/200/200/?random"
};

describe("WineCard", () => {
    it("renders product name and description as passed in the props", () => {
        const { getByText } = render(<WineCard {...baseProps}/>);
        const name = getByText("Royal Solute");
        const description = getByText("Royal Salute 21 Year Old Blended Scotch Whisky Miami Polo Edition 700ml (Gift Box)");
        expect(name).toBeInTheDocument();
        expect(description).toBeInTheDocument();
    });

    it("renders the accessible product image", () => {
        const { getByAltText } = render(<WineCard {...baseProps}/>);
        const productImage = getByAltText("Royal Solute product image");

        expect(productImage).toBeInTheDocument();
    });

    it("renders the tag if it is available", () => {
        const { getByText } = render(<WineCard {...baseProps} productTag="Sale"/>);
        const tag = getByText("Sale");

        expect(tag).toBeInTheDocument();
    });

    it("renders the current cash price solely if was cash price is nullish", () => {
        const { getByText } = render(<WineCard {...baseProps} currentPriceCashAmount={500} currentPriceCashCurrencyCode="AUD"/>);
        const currenCashPrice = getByText("$500");

        expect(currenCashPrice).toBeInTheDocument();
    });

    it("renders the current cash price and was cash price if was cash price is not nullish in an accessible way", () => {
        const { getByLabelText } = render(<WineCard {...baseProps} currentPriceCashAmount={500} currentPriceCashCurrencyCode="AUD" wasPriceCashAmount={600} wasPriceCashCurrencyCode="AUD"/>);
        const wasCashPrice = getByLabelText("It was $600.");
        const currentCashPrice = getByLabelText("Now only $500.");

        expect(wasCashPrice).toBeInTheDocument();
        expect(currentCashPrice).toBeInTheDocument();
    });

    it("renders the current points solely if was points is nullish", () => {
        const { getByText } = render(<WineCard {...baseProps} currentPricePoints={5000}/>);
        const currenPoints = getByText("5000 PTS");

        expect(currenPoints).toBeInTheDocument();
    });

    it("renders the current points and was points if was points is not nullish in an accessible way", () => {
        const { getByLabelText } = render(<WineCard {...baseProps} currentPricePoints={5000} wasPricePoints={6000}/>);
        const currentPoints = getByLabelText("With 5000 PTS now.");
        const wasPoints = getByLabelText("Discounted from 6000 PTS.");

        expect(currentPoints).toBeInTheDocument();
        expect(wasPoints).toBeInTheDocument();
    });

});
