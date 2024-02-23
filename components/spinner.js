import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="../public/images/Loading_icon.gif"
        alt="Loading"
        width={100}
        height={100}
      />
    </div>
  );
};

export default LoadingSpinner;
