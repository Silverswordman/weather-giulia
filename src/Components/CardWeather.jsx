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
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.latandlong.lat}&lon=${props.latandlong.lon}&appid=a7f97bb8f115716e1864b7863ebc45a7&units=metric`
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

            {/* DROPDOWN PER LA SCELTA CORDINATE */}
            {/* CARD con weather */}

            {/* Se è loading spinner */}
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden"></span>
              </Spinner>
            ) : // Senno stampa weather data
            weatherData ? (
              <div>
                <Card.Body className="bg-info-subtle text-start">
                  <Card.Title className="bg-primary-subtle fs-3 ">
                    {weatherData.name}
                  </Card.Title>
                  <Card.Text>
                    {weatherData.weather[0].main}{" "}
                    {weatherData.weather[0].description}
                  </Card.Text>

                  <Card.Text>{weatherData.main.temp}</Card.Text>
                  <Card.Text>{weatherData.main.temp}</Card.Text>
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
