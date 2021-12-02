import FlightSummary from "./FlightSummary";
import FlightPriceCard from "./FlightPriceCard";
import { useHttpClient } from "../../hooks/http-hook";
import { useEffect, useState } from "react";
import choose from "../../assets/images/choose2.png";

const FlightSummaryCard = ({
  departureFlightId,
  returnFlightId,
  cabinClass,
}) => {
  const { sendRequest, isLoading } = useHttpClient();
  const [departureFlight, setDepartureFlight] = useState();
  const [returnFlight, setReturnFlight] = useState();
  const [departureFlightPrice, setDepartureFlightPrice] = useState();
  const [returnFlightPrice, setReturnFlightPrice] = useState();
  useEffect(() => {
    const getDepartureFlightData = async () => {
      try {
        const response = await sendRequest(`/flight/${departureFlightId}`);
        if (response && response.data) {
          setDepartureFlight(response.data);
          setDepartureFlightPrice(response.data.price);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getReturnFlightData = async () => {
      try {
        const response = await sendRequest(`/flight/${returnFlightId}`);
        if (response && response.data) {
          setReturnFlight(response.data);
          setReturnFlightPrice(response.data.price);
        }
      } catch (err) {
        console.log(err);
      }
    };
    if (departureFlightId) {
      getDepartureFlightData();
    }
    if (returnFlightId) {
      getReturnFlightData();
    }
  }, [departureFlightId, returnFlightId, sendRequest]);
  return (
    <div className="w-full">
      {departureFlight ? (
        <div className=" border-1 justify-end ml-xxl mr-xxxl border-solid border-pale-purple rounded-12 p-24 ">
          <FlightSummary
            departureTime={departureFlight.departureTime}
            arrivalTime={departureFlight.arrivalTime}
            cabinClass={cabinClass}
          />
          <hr className="border-solid border-pale-purple mt-lg mb-6" />
          {returnFlight ? (
            <FlightSummary
              departureTime={returnFlight.departureTime}
              arrivalTime={returnFlight.arrivalTime}
              cabinClass={cabinClass}
            />
          ) : (
            <span className="m-xxl justify-center">
              Your return flight will be shown here when selected
            </span>
          )}
        </div>
      ) : (
        <img src={choose} alt="choose your departure and return flights" />
      )}
      <FlightPriceCard
        price1={departureFlightPrice}
        price2={returnFlightPrice}
      />
    </div>
  );
};

export default FlightSummaryCard;
