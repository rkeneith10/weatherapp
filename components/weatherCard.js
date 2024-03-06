import Image from "next/image";
const WeatherCard = ({
  country,
  location,
  weatherC,
  weatherF,
  cloud,
  condition,
  humidity,
  icon,
  time,
  weatherTimeC,

  iconTime,
}) => {
  return (
    <div className=" rounded-lg shadow-md p-6 sm:w-full lg:w-[400px] bg-gradient-to-r from-blue-200 to-blue-100">
      <h2 className="text-xl font-semibold">
        {location}, {country}
      </h2>
      <div className="mt-4">
        <Image
          src={`https:${icon}`}
          alt="Cloud condition"
          width={100}
          height={100}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div>
          <p className="text-gray-600">Temperature</p>
          <p className="text-2xl font-semibold">
            {weatherC}°C / {weatherF}°F
          </p>
        </div>
        <div>
          <p className="text-gray-600">Cloud</p>
          <p className="text-xl font-semibold">{cloud}%</p>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-600">Weather Condition</p>
        <p className="text-lg font-semibold">{condition}</p>
      </div>
      <div className="mt-2">
        <p className="text-gray-600">Humidity</p>
        <p className="text-xl font-semibold">{humidity}%</p>
      </div>
      <div className="text-center font-semibold mt-3">
        Cloudy condition from 00.00-11:00
      </div>

      <div className="mt-3 grid grid-cols-4 mr-4">
        {time.slice(0, 12).map((hour, index) => (
          <div
            key={index}
            className={`p-2 ${index % 4 !== 3 ? "border-r" : ""}`}
          >
            <p className="font-semibold"> {hour}</p>
            <Image src={`${iconTime[index]}`} width={50} height={50} />
            <p> {weatherTimeC[index]}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
