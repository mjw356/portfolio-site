import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

function Header() {
  const static_base = process.env.STATIC_URL;
  return (
    <Row className="py-5">
        <Col className='col-2'>
            <Image src={{static_base} + "/roastingmarshmallows-100.png"} fluid />
        </Col>
        <Col className="align-self-end text-end my-auto">
        <strong>
        <a href='/'
            className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
              home
          </a> &nbsp;|&nbsp; 
          <a href="portfolio"
            className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
              portfolio
          </a> &nbsp;|&nbsp; 
          <a href='blog'
            className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
              blog
          </a>
        </strong>
        </Col>
    </Row>
  );
}

export default Header;
