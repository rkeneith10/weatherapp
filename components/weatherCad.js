const WeatherCard = ({
  location,
  weatherC,
  weatherF,
  humidity,
  condition,
  icon,
}) => {
  <div className="bg-red-500 p-5 rounded-sm">
    <h2 className="text-xl font-semibold">{location}</h2>
    <p>{weatherC}</p>
    <p>{weatherF}</p>
    <p>Humidity: {humidity}%</p>
    <p>Condition: {condition}</p>
    {icon && <Image src={`https:${icon}`} alt="Weather icon" />}
  </div>;
};
export default WeatherCard;
