import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherNav from "./Components/WeatherNav";
import WeatherFooter from "./Components/WeatherFooter";
import SearchWeather from "./Components/SearchWeather";

function App() {
  return (
    <div className="App h-100  d-flex flex-column ">
      <WeatherNav />
      <h3 className="mt-4 text-white-50">Search a city here:</h3>
      <SearchWeather />
      <WeatherFooter />
    </div>
  );
}

export default App;
