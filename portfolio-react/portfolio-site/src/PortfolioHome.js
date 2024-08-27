import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function PortfolioHome() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>THIS IS THE PORTFOLIO HOME</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default PortfolioHome;
