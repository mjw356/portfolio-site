// import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import { useEffect, useState } from 'react';
import PortfolioListItem from './Components/PortfolioListItem';

function PortfolioHome() {
  const backend = process.env.REACT_APP_BACKEND;
  const [posts, setPosts] = useState([]);
  const portfolioCatId = 1;

  useEffect(() => {
    // this will fetch the blog posts only on the first time the component loads
    fetch(backend + '/posts/',
        {
            headers: new Headers({'content-type': 'application/json'}),
            method: "GET"
        })
    .then((res) => { return res.json(); })
    .then((jsonResp) => {
        let portfolioResults = jsonResp.results.filter((post) => post.categories.includes(portfolioCatId));
        setPosts(portfolioResults);
    })
  }, [])

  return (
    <Container>
      <Header />
      <Row className="justify-content-center mb-5">
        <Col className='col-3 border-bottom border-3 text-center'>
          <h1 className='display-1'>portfolio.</h1>        
        </Col>
      </Row>
      {
        posts.map((post) => {
          return <PortfolioListItem portfolioItem={post} />
        })
      }
    </Container>
  );
}

export default PortfolioHome;
