import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import CardWeather from "./CardWeather";
import { useEffect } from "react";
import { useState } from "react";
function SearchWeather() {
  const [searchData, setWeatherData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        let resp = await fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=a7f97bb8f115716e1864b7863ebc45a7`
        );
        if (resp.ok) {
          let data = await resp.json();
          console.log(data);
          setWeatherData(data);
        } else {
          console.log("error fetching search weather");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, [searchValue]);

  return (
    <Container>
      <Form.Group>
        <Form.Control
          type="search"
          placeholder="Will I have to take the umbrella?"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
      </Form.Group>
      {searchData.length > 0 && <CardWeather latandlong={searchData[0]} />}
    </Container>
  );
}
export default SearchWeather;
