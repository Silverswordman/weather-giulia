import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from 'react-bootstrap/Spinner';


function MainCard() {
  const [weatherData, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        let resp = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=a7f97bb8f115716e1864b7863ebc45a7"
        );
        if (resp.ok) {
          let data = await resp.json();
          console.log(data);
          setWeather(data);
        } else {
          console.log("error fetching weather");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, []);

  return (
    <Container className="my-5 h-100 flex-grow-1 ">
      <Row>
        <Col>
          <Card>
            {/* INIZIO DROP */}
            <DropdownButton
              id="dropdown-basic-button"
              title="Weather Info"
              variant="info"
              className="p-2"
            >
              <Dropdown.Item className=" fst-italic">Londra</Dropdown.Item>
              <Dropdown.Item className=" fst-italic">Roma</Dropdown.Item>
              <Dropdown.Item className=" fst-italic">Parigi</Dropdown.Item>
              <Dropdown.Item className=" fst-italic">New York</Dropdown.Item>
            </DropdownButton>

            {/* DROPDOWN PER LA SCELTA CORDINATE */}
            {/* CARD con weather */}
            {weatherData ? ( // Verifica se weatherData è disponibile
              <div>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{weatherData.name}</Card.Title>
                  <Card.Text>{weatherData.weather[0].description}</Card.Text>
                  <Card.Text>{weatherData.weather[0].main}</Card.Text>
                </Card.Body>
              </div>
            ) : (
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MainCard;
