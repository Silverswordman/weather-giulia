import Form from "react-bootstrap/Form";
import { Row, Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import CardWeather from "./CardWeather";
import { useEffect } from "react";
import { useState } from "react";
function SearchWeather() {
  const [searchData, setWeatherData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (searchValue.trim() !== "") {
          // Verifica che searchValue non sia una stringa vuota
          let resp = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=5&appid=eb3c347d3ab6bb2e69d3791773211185`
          );
          if (resp.ok) {
            let data = await resp.json();
            console.log(data);
            setWeatherData(data);
          } else {
            console.log("error fetching search weather");
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeatherData();
  }, [searchValue]);

  return (
    <Container className="d-flex flex-column flex-grow-1">
      <h3 className="mt-4 text-white-50">Search a city here:</h3>
      <Row className="justify-content-center">
        <Col xs={11} sm={11} md={8} lg={6}>
          <Form.Group>
            <Form.Control
              className=" p-1 fs-5  "
              type="search"
              placeholder="Will you have to take the umbrella? or the sunscreen?"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          {searchData.length > 0 && <CardWeather latandlong={searchData[0]} />}
        </Col>
      </Row>
    </Container>
  );
}
export default SearchWeather;
