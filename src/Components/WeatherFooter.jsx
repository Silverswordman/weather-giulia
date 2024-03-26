import { Container, Row, Col } from "react-bootstrap";
import { format } from "date-fns";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function WeatherFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Container
      fluid
      className="text-center  bg-info-subtle sticky-bottom border-top border-3 border-white"
    >
      <Row className="text-muted small fst-italic py-2 justify-content-center ">
        <Col>© Silvestrini Giulia for Epicode {currentYear}</Col>
        <Col>
        <a
            href="https://www.linkedin.com/in/giulia-silvestrini-943a2b1b5/"
            target="_blank"
            rel="noopener noreferrer"
            className="fs-5 me-3 "
          >
            <FaLinkedin className="text-muted" />
          </a>
          <a
            href="https://github.com/Silverswordman"
            target="_blank"
            rel="noopener noreferrer"
            className="fs-5"
          >
            <FaGithub className="text-muted" />
          </a>
        </Col>
      </Row>
    </Container>
  );
}
export default WeatherFooter;
