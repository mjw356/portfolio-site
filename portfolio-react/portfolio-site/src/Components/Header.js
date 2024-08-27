import '../App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Row xs={2} md={4} lg={6} style={{backgroundColor: "grey"}}>
        <Col>
            <Image src="logo192.png" fluid />
        </Col>
        <Col>
            <h1>this is the page header</h1>
        </Col>
    </Row>
  );
}

export default Header;
