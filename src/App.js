import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherNav from "./Components/WeatherNav";
import WeatherFooter from "./Components/WeatherFooter";
import SearchWeather from "./Components/SearchWeather";

function App() {
  return (
    <div className="App h-100 flex-grow-1">
      <WeatherNav />
      <SearchWeather />
      <WeatherFooter />
    </div>
  );
}

export default App;
