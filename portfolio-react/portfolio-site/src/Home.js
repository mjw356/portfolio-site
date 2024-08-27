import logo from './logo.svg';
import './portfolio-site.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  return (
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
  );
}

export default Home;
