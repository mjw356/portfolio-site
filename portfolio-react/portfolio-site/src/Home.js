import './portfolio-site.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Home() {
  return (
    <Container className='h-100'>
      <Row className='h-100 align-items-center'>
        <Col>
          <Row className='align-items-center'>
            <Col className='col-md-6 col-12 text-center'>
                <h1 className='display-4'>Wolf On The Web</h1>
                <p className='lead'>portfolio and blog of mike.</p>
                <p className='font-size-lg'>
                  <strong>
                  <a href="portfolio" className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>portfolio</a> | <a href='blog' className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>blog</a>
                  </strong>
                </p>
            </Col>
            <Col className='col-md-6 col-12 text-center'>
                <Image src="https://static.wolfontheweb.com/roastingmarshmallows.png" fluid></Image>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
