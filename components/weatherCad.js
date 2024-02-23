import Image from "next/image";

const WeatherCard = ({
  location,
  weatherC,
  weatherF,
  humidity,
  condition,
  icon,
}) => {
  <div className="bg-red-500 p-5 rounded-sm">
    {location && <h2 className="text-xl font-semibold">{location}</h2>}
    {weatherC && <p>{weatherC}</p>}
    {weatherF && <p>{weatherF}</p>}
    {humidity && <p>Humidity: {humidity}%</p>}
    condition && {<p>Condition: {condition}</p>}
    {icon && <Image src={`https:${icon}`} alt="Weather icon" />}
  </div>;
};
export default WeatherCard;
