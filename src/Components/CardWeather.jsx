import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";

function CardWeather(props) {
  const [weatherData, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (props.latandlong) {
          setLoading(true);
          let resp = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${props.latandlong.lat}&lon=${props.latandlong.lon}&appid=eb3c347d3ab6bb2e69d3791773211185&units=metric`
          );
          if (resp.ok) {
            let data = await resp.json();
            console.log(data);
            setWeather(data);
            setLoading(false);
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
          <Card className="border-0 rounded-pill">
            {/* Se è loading spinner */}
            {loading ? (
              <div className="text-center m-3 border-0 rounded-0 ">
                <Spinner
                  animation="border"
                  variant="info"
                  role="status"
                  className="fs-4 text-center  "
                ></Spinner>
              </div>
            ) : // Senno stampa weather data
            weatherData ? (
              <div>
                <Card.Body className="bg-info-subtle text-start border-0 ">
                  <Card.Title className=" fs-2 ps-2 p-1 ">
                    {weatherData.name} , {weatherData.sys.country}
                  </Card.Title>
                  <div className="d-flex justify-content-center justify-content-md-start ms-md-4">
                    <img
                      className=" bg-info border rounded-pill mb-2 mt-3 "
                      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                      alt="img"
                    ></img>
                  </div>
                  <Card.Text className="fs-3 text-center text-md-end me-md-5 my-1 fw-bold  ">
                    {weatherData.weather[0].main.toUpperCase()}{" "}
                  </Card.Text>
                  <Row className="flex-column-reverse flex-md-row ">
                    <Col>
                      {" "}
                      <Card.Text className="fs-5 ms-5 my-5">
                        Temperature {weatherData.main.temp}°C
                        <Card.Text className="fs-6 text-secondary m-0">
                          Max Temp. {weatherData.main.temp_max} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Min Temp. {weatherData.main.temp_min} °C
                        </Card.Text>
                        <Card.Text className="fs-6 text-secondary m-0">
                          Real Feel Temp {weatherData.main.feels_like} °C
                        </Card.Text>
                      </Card.Text>
                    </Col>
                    <Col>
                      {" "}
                      <Card.Text className="fs-5 text-center text-md-end me-md-5">
                        {weatherData.weather[0].description}
                      </Card.Text>
                    </Col>
                  </Row>

                  <Row className="text-center fs-5">
                    <Col xs={12} sm={6}>
                      Sunrise <i className="bi bi-sunrise mx-1"></i>
                      {risehours}:{riseminutes}
                    </Col>
                    <Col xs={12} sm={6}>
                      Sunset <i className="bi bi-sunset-fill mx-1"></i>
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
