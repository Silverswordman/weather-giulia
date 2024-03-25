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
             <Card className="border-0 rounded-pill">
              <Card.Title>
                {weatherForecast.city.name}, {weatherForecast.city.country}
              </Card.Title>

              <Card className="overflow-scroll-y">
                <Row className=" justify-content-center row-cols-5">
                  {weatherForecast.list && weatherForecast.list.length > 0 ? (
                    weatherForecast.list.map((weather, index) => (
                      
                      <Col className="bg-info-subtle h-100 m-1 " key={index}>
                        <Row>
                          <Card.Text>{weather.dt_txt.slice(2,-3)}</Card.Text>

                          <Card.Text>
                            {weather.weather[0].description}
                            <Card.Img 
                      className="w-25 bg-info border rounded-pill mb-2 mt-3 "
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                      alt="img"
                    ></Card.Img>
                          </Card.Text>
                        
                        </Row>
                      </Col>
                    ))
                  ) : (
                    <p>No forecast available</p>
                  )}
                </Row>
              </Card>
            </Card>
          </Container>
        ) : null}
      </Card>
    </Container>
  );
}

export default WeatherForecast;
