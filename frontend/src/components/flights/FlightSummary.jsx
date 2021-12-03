import moment from "moment";
import EgyptAirLogo from "../../assets/images/egypt-air-logo.png";
const FlightSummary = ({ departureTime, arrivalTime, cabinClass }) => {
  return (
    <div className="flex">
      <div className=" flex justify-center items-center">
        <img src={EgyptAirLogo} alt="Egypt Air" />
      </div>
      <div className="flex flex-col ml-md mb-lg">
        <span className=" font-nunito text-grey-4 text-base mb-sm justify-start">
          {moment(departureTime).format("DD MMM")} Departing
        </span>
        <span className=" font-nunito text-grey-4 text-base justify-start">
          {moment(arrivalTime).format("DD MMM")} Arriving
        </span>
      </div>
      <div className="flex flex-col ml-md ">
        <span className="font-nunito text-grey-4 text-base mb-sm justify-end text-right">
          {moment(departureTime).format("hh:mm a")} -{" "}
          {moment(arrivalTime).format("hh:mm a")}
        </span>
        <span className="font-nunito text-grey-4 text-base justify-end text-right">
          {moment(moment(arrivalTime).diff(moment(departureTime))).format(
            "h[h] m[m]"
          )}
        </span>
        <span className="flex-auto font-nunito text-grey-4 text-base justify-end text-right">
          {cabinClass}
        </span>
      </div>
    </div>
  );
};

export default FlightSummary;
