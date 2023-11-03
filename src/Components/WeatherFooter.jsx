import Card from "react-bootstrap/Card";
import { format } from "date-fns";

function WeatherFooter() {
  const currentDate = new Date();
  const currentYear = format(currentDate, "yyyy");

  return (
    <Card className="text-center mt-5 bg-info-subtle">
      <Card.Body>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted small fst-italic">
        © Silvestrini Giulia for Epicode {currentYear}
      </Card.Footer>
    </Card>
  );
}
export default WeatherFooter;
