import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { format } from "date-fns";

function WeatherNav() {
  const currentDate = new Date();
  const currentDay = format(currentDate, "EEEE do");
  const currentMonth = format(currentDate, "LLLL");

  return (
    <Navbar expand="lg" className="bg-info-subtle x ">
      <Container fluid>
        <Navbar.Brand href="/" className="fw-bold">
          <i className="bi bi-cloud-sun fs-1"> </i> Weather Info
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav " />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className="fs-5 text-center">
            Today is {currentDay} of {currentMonth}{" "}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WeatherNav;
