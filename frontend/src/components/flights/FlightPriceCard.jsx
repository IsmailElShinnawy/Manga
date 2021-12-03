const FlightPriceCard = ({ price1, price2 }) => {
  const taxes = price1 * 0.14 + price2 * 0.14;
  return (
    <div className="flex flex-col w-full items-end">
      <div className=" mb-md justify-end">
        <span className="mr-xxl text-grey-4 font-nunito text-base ">
          Subtotal
        </span>
        <span className="text-base font-nunito text-grey-4">
          ${price1 + price2}
        </span>
      </div>
      <div className="mb-md justify-end">
        <span className=" text-right mr-xxl text-grey-4 font-nunito text-base">
          Taxes
        </span>
        <span className=" text-right text-base font-nunito text-grey-4">
          ${taxes}
        </span>
      </div>
      <div className="mb-md justify-end">
        <span className="mr-xxl text-grey-4 font-nunito text-base">Total</span>
        <span className="text-base font-nunito text-grey-4">
          ${price1 + price2 + taxes}
        </span>
      </div>
    </div>
  );
};

export default FlightPriceCard;
