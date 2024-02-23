import Image from "next/image";
import gifspinner from "../public/images/Loading_icon.gif";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <Image src={gifspinner} alt="Loading" width={200} height={200} />
    </div>
  );
};

export default LoadingSpinner;
