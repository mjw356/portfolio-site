import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';

function BlogListItem({blogItem}) {
    return (
        <Row className="mb-3">
            <Col className='col-1 bg-light offset-2 text-center'>
                <p className='fs-5 m-0'>AUG</p>
                <p className='fs-2 m-0'>29</p>
            </Col>
            <Col className='col-7 my-auto'>
                <a href={`blog/${blogItem.id}`} className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'>
                    <h2>{blogItem.title}</h2>
                </a>            
            </Col>
        </Row>
  );
}

export default BlogListItem;