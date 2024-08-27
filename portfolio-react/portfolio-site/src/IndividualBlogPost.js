import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

function IndividualBlogPost() {
  return (
    <Container>
      <Row>
        <Col md={6}>
          <h1>INDIVIDUAL BLOG POST</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default IndividualBlogPost;
