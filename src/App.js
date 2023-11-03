import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WeatherNav from "./Components/WeatherNav";
import MainCard from "./Components/MainCard";
import WeatherFooter from "./Components/WeatherFooter";

function App() {
  return (
    <div className="App h-100 flex-grow-1">
      <WeatherNav />
      <MainCard />
      <WeatherFooter />
    </div>
  );
}

export default App;
