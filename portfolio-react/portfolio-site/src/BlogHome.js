import Container from 'react-bootstrap/Container';
import Header from './Components/Header'
import { useEffect, useState } from 'react';
import BlogListItem from './Components/BlogListItem';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function BlogHome() {
  const [posts, setPosts] = useState([]);
  const portfolioCatId = 22;

  useEffect(() => {
    // this will fetch the blog posts only on the first time the component loads
    fetch('http://localhost:8000/posts/',
        {
            headers: new Headers({'content-type': 'application/json'}),
            method: "GET"
        })
    .then((res) => { return res.json(); })
    .then((jsonResp) => {
        let portfolioResults = jsonResp.results.filter((post) => !post.categories.includes(portfolioCatId));
        setPosts(portfolioResults);
    })
  }, [])

  return (
    <Container>
      <Header />
      <Row className="justify-content-center mb-5">
        <Col className='col-3 border-bottom border-3 text-center'>
          <h1 className='display-1'>entries.</h1>        
        </Col>
      </Row>
      {
        posts.map((blogItem) => {
          console.log(blogItem);
          return <BlogListItem blogItem={blogItem} />
        })
      }
    </Container>
  );
}

export default BlogHome;
