import { Link, useLocation } from "react-router-dom";

export default function Success() {
  // Get data to display
  const location = useLocation();
  let message = "", returnName="Home", returnAddress="/";
  if (location.state != null) {
    message = location.state.message;
    returnName = location.state.returnName;
    returnAddress = location.state.returnAddress;
  }

  // Success page
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-6 my-12">
      {/** Success text */}
      <div className="text-4xl md:text-6xl lg:8xl font-bold text-center text-black">
        Success!
      </div>
      {/** Success Message */}
      <div className="text-primary text-xl">
        {message.toString()}
      </div>
      {/** Success Image */}
      <div className="relative min-h-[20rem] w-full h-full flex justify-center">
        <img
          alt="Success Image"
          src="/success.svg"
          className="object-contain h-full absolute"
        />
      </div>
      {/** Link to return */}
      <div>
        Go to
        <span className="mx-1">
          <Link
            to={returnAddress}
            className="font-semibold text-primary hover:text-black transition-all ease-in duration-250"
          >
            {returnName}
          </Link>
        </span>
      </div>
    </div>
  );
}
