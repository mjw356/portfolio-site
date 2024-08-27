import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminHome() {
  return (
    <div className="App">
      <header className="App-header">
      <Container>
        <Row>
          <Col md={6}>
            <h1>This is the Admin Home</h1>
          </Col>
        </Row>
      </Container>
      </header>
    </div>
  );
}

export default AdminHome;
