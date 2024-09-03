import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Header() {
  return (
    <Row className="align-items-center py-5">
        <Col className='col-2'>
            <Image src="http://localhost:3000/roastingmarshmallows-100.png" fluid />
        </Col>
    </Row>
  );
}

export default Header;
