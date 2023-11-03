import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function CardWeather(props) {
  const [weatherData, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (props.latandlong) {
          setLoading(false);
          let resp = await fetch(
            // `https://api.openweathermap.org/data/2.5/weather?lat=41.7089&lon=12.6866&appid=a7f97bb8f115716e1864b7863ebc45a7`
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.latandlong.lat}&lon=${props.latandlong.lon}&appid=a7f97bb8f115716e1864b7863ebc45a7`
          );
          if (resp.ok) {
            let data = await resp.json();
            console.log(data);
            setWeather(data);
          } else {
            console.log("error fetching weather");
            setLoading(false);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    if (props.latandlong) {
      fetchWeather();
    }
  }, [props.latandlong]);

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

            {/* Se è loading spinner */}
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : // Senno stampa weather data
            weatherData ? (
              <div>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>{weatherData.name}</Card.Title>
                  <Card.Title>{weatherData.weather[0].description}</Card.Title>
                  <Card.Text>{weatherData.weather[0].main}</Card.Text>
                </Card.Body>
              </div>
            ) : null}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CardWeather;
