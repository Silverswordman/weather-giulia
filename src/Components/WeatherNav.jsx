import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { format } from "date-fns";

function WeatherNav() {
  const currentDate = new Date();
  const currentDay = format(currentDate, "EEEE do");
  const currentMonth = format(currentDate, "LLLL");

  return (
    <Navbar expand="lg" className="bg-info-subtle  sticky-top border-bottom  border-3 border-white">
      <Container className="p-0">
        <Navbar.Brand href="/" className="fw-bold me-5 btn border-0 p-0">
          <i className="bi bi-cloud-sun fs-1"> </i> Weather Info
        </Navbar.Brand>
        <Nav.Link>
          {" "}
          <div className="fs-5  fst-italic  ms-5 ">
            Today is {currentDay} of {currentMonth} - check the weather anywhere
            you want !
          </div>
        </Nav.Link>
     
      </Container>
    </Navbar>
  );
}

export default WeatherNav;
