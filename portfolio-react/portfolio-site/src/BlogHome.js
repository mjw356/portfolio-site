import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function BlogHome() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>THIS IS THE BLOG HOME</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default BlogHome;
