import logo from './logo.svg';
import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
      <Container>
        <Row>
          <Col md={6}>
            <h1>Wolf On The Web</h1>
          </Col>
          <Col md={6}>
            <Image src="roastingmarshmallows.webp" fluid></Image>
          </Col>
        </Row>
      </Container>
      </header>
    </div>
  );
}

export default Home;
