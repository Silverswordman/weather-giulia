import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Spinner,
  Carousel,
  Row,Col,
  
} from "react-bootstrap";

function WeatherForecast(props) {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.latandlong) {
          setLoading(true);
          setTimeout(async () => {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${props.latandlong.lat}&lon=${props.latandlong.lon}&appid=eb3c347d3ab6bb2e69d3791773211185&units=metric`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch weather forecast");
            }

            const data = await response.json();
            console.log(data);

            setWeatherForecast(data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.latandlong]);

  const reduceForecast = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 4);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  return (
    <Container className=" border-pill bg-transparent border-0  mb-5 p-5">
      {loading ? (
        <div className="text-center m-3 border-0 rounded-0">
          <Spinner
            animation="border"
            variant="info"
            role="status"
            className="fs-4 text-center"
          />
        </div>
      ) : weatherForecast ? (
        <Container className="mb-1 bg-trasparent">
          <Card.Body className="border-pill bg-white py-2  py-md-0">
            <Card.Title className="fs-2 my-2 p-2 ">
              Forecast 5 days in {weatherForecast.city.name},{" "}
              {weatherForecast.city.country}
            </Card.Title>
            <Carousel fade>
              {weatherForecast.list && weatherForecast.list.length > 0 ? (
                weatherForecast.list
                  .reduce(reduceForecast, [])
                  .map((weatherGroup, index) => (
                    <Carousel.Item key={index} >
                      <Container className="mb-5 py-3 bg-info-subtle px-xs-1">
                        <Row
                          xs={1}
                          sm={2}
                          md={4}
                          lg={5}
                          className="justify-content-center flex-wrap p-3 p-sm-0  "
                        >
                          {weatherGroup.map((weather, index) => (
                            <Card key={index} className="m-1 p-2 border-0 shadow-sm" id="exc">
                              {weather && (
                                <Card.Text className="fs-5 fst-italic fw-semibold ">
                                  {weather.dt_txt.slice(2, -3)}
                                </Card.Text>
                              )}
                              {weather && (
                                <Row >
                                <Col className="col-12 col-lg-6 "><Card.Text className="fw-bold">
                                {weather.weather[0].main.toUpperCase()}</Card.Text>
                                <Card.Text>{weather.weather[0].description}</Card.Text>
                                  
                                  </Col>
                                  <Col className="col-12 col-lg-6">
                                  <Card.Img
                                    className="w-50 p-1 bg-info border rounded-pill mb-2 mt-3"
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                                    alt="img"
                                  /></Col>
                                </Row>
                              )}
                            </Card>
                          ))}
                        </Row>
                      </Container>
                    </Carousel.Item>
                  ))
              ) : (
                <p>No forecast available</p>
              )}
            </Carousel>
          </Card.Body>
        </Container>
      ) : null}
    </Container>
  );
}

export default WeatherForecast;
