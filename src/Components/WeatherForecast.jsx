import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Carousel, Row } from 'react-bootstrap';

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
              throw new Error('Failed to fetch weather forecast');
            }

            const data = await response.json();
            console.log(data);

            setWeatherForecast(data);
            setLoading(false);
          }, 1000);
        }
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
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
    <Container className="border-pill mb-5 p-5">
      <Card className="bg-transparent border-0">
        {loading ? (
          <div className="text-center m-3 border-0 rounded-0">
            <Spinner animation="border" variant="info" role="status" className="fs-4 text-center" />
          </div>
        ) : weatherForecast ? (
          <Container className="mb-1">
            <Card className="border-pill">
              <Card.Title className="fs-2 my-2 p-1">
                Forecast 5 days {weatherForecast.city.name}, {weatherForecast.city.country}
              </Card.Title>
              <Carousel>
                {weatherForecast.list && weatherForecast.list.length > 0 ? (
                  weatherForecast.list.reduce(reduceForecast, []).map((weatherGroup, index) => (
                    <Carousel.Item key={index}>
                      <Container>
                        <Row xs={1} sm={2} md={4} lg={5} className="justify-content-center flex-wrap">
                          {weatherGroup.map((weather, index) => (
                            <Card key={index} className="m-1">
                              {weather && <Card.Text>{weather.dt_txt.slice(2, -3)}</Card.Text>}
                              {weather && (
                                <Card.Text>
                                  {weather.weather[0].description}
                                  <Card.Img
                                    className="w-25 bg-info border rounded-pill mb-2 mt-3"
                                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                                    alt="img"
                                  />
                                </Card.Text>
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
            </Card>
          </Container>
        ) : null}
      </Card>
    </Container>
  );
}

export default WeatherForecast;
