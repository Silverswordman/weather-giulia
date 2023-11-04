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

  // Funzioni per convertire i time sunrise e sunset da unix a attuali
  // con controllo del weather data null
  const UnixSunriseTime = weatherData ? weatherData.sys.sunrise : null;
  const risedate = UnixSunriseTime ? new Date(UnixSunriseTime * 1000) : null;
  const risehours = risedate ? risedate.getHours() : null;
  const riseminutes = risedate ? risedate.getMinutes() : null;

  const UnixSunsetTime = weatherData ? weatherData.sys.sunset : null;
  const setdate = UnixSunsetTime ? new Date(UnixSunsetTime * 1000) : null;
  const sethours = setdate ? setdate.getHours() : null;
  const setminutes = setdate ? setdate.getMinutes() : null;
  //

  return (
    <Container className="my-5 ">
      <Row>
        <Col>
          <Card>
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
                  <Card.Title className="bg-primary text-white fs-2 ps-2 p-1 ">
                    {weatherData.name}
                  </Card.Title>
                  <Card.Text className="fs-3 text-end me-5">
                    {weatherData.weather[0].main}{" "}
                  </Card.Text>
                  <Card.Text className="fs-5 text-end me-5">
                    {weatherData.weather[0].description}
                  </Card.Text>

                  <Card.Text className="fs-5">
                    Temperature {weatherData.main.temp}°C
                  </Card.Text>
                  <Row className="text-center fs-4">
                    <Col xs={6}>
                      Sunrise <i className="bi bi-sunrise-fill mx-1"></i>
                      {risehours}:{riseminutes}
                    </Col>
                    <Col xs={6}>
                      Sunset <i className="bi bi-sunset mx-1"></i>
                      {sethours}:{setminutes}
                    </Col>
                  </Row>
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
