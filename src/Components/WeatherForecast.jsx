import { Container, Card, Spinner, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

function WeatherForecast(props) {
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (props.latandlong) {
          setLoading(true);
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
        }
      } catch (error) {
        console.error("Error fetching weather forecast:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.latandlong]);

  return (
    <Container>
      <Card className="border-0 rounded-pill">
        {loading ? (
          <div className="text-center m-3 border-0 rounded-0 ">
            <Spinner
              animation="border"
              variant="info"
              role="status"
              className="fs-4 text-center"
            ></Spinner>
          </div>
        ) : weatherForecast ? (
          <Container>
            <Card>
              <Card.Title>
                {weatherForecast.city.name}, {weatherForecast.city.country}
              </Card.Title>
                             
                <Container>
                  <Row>
                  {weatherForecast.list && weatherForecast.list.length > 0 ? (
                   
                    weatherForecast.list.map((weather, index) => (
                      <Card className="col-4 " key={index}>
                        <Row>
                          <Col>
                            <Card.Text>{weather.dt_txt}</Card.Text>
                          </Col>
                          <Col>
                            <Card.Text>
                              {weather.weather[0].description}
                            </Card.Text>
                          </Col>
                        </Row>
                      </Card>
                    ))
                    ) : (
                    <p>No forecast available</p>
                  )}
                  </Row>
                </Container>
             
            </Card>
          </Container>
        ) : null}
      </Card>
    </Container>
  );
}

export default WeatherForecast;
