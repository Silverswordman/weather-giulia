import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function WeatherNav() {
  return (
    <Navbar expand="lg" className="bg-info-subtle">
      <Container>
        <Navbar.Brand href="#home">
          <i className="bi bi-cloud-sun fs-2"> </i> Weather Info
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WeatherNav;
