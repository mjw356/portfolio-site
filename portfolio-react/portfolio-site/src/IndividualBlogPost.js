// import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function IndividualBlogPost() {
  const [blogItem, setBlogItem] = useState({title: "", owner: "", body: ""});
  let blogId = useParams();
  console.log(blogId);

  useEffect(() => {
      // this will fetch the blog post only on the first time the component loads
      fetch('http://localhost:8000/posts/' + blogId.id,
        {
            headers: new Headers({'content-type': 'application/json'}),
            method: "GET"
        })
    .then((res) => { return res.json(); })
    .then((jsonResp) => {
        setBlogItem(jsonResp);
    })
  }, [])

  return (
    <Container>
      <Header />
        <Row className='justify-content-center'>
          <Col lg={6} className='text-center'>
            <h1 className='display-4'>{blogItem.title}</h1>
            <p className='fs-4'>by: {blogItem.owner}</p>
            {/* can only dangerously set inner html because we trust the source */}
            <div className='text-start fs-5' dangerouslySetInnerHTML={{__html: blogItem.body}} />
          </Col>
        </Row>
    </Container>
  );
}

export default IndividualBlogPost;
