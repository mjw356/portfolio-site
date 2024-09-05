import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

function BlogListItem({blogItem}) {

    function DateFormatter(){
        console.log(blogItem.published);
        let d = new Date(blogItem.published);
        const month = d.toLocaleString('en-us', { month: 'short' });
        const day = d.toLocaleString('en-us', { day: '2-digit' });

        return (
            <div>
                <p className='fs-5 m-0 text-uppercase'>{month}</p>
                <p className='fs-2 m-0'>{day}</p>
            </div>
        )
    }

    return (
        <Row className="mb-3">
            <Col className='col-1 bg-light offset-2 text-center'>

                <DateFormatter />

            </Col>
            <Col className='col-7 my-auto'>
                <Link
                    to={`${blogItem.id}`}
                    state={blogItem}
                    className='link-secondary link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover'
                >
                {/* <a href={`blog/${blogItem.id}`} > */}
                    <h2>{blogItem.title}</h2>
                </Link>            
            </Col>
        </Row>
  );
}

export default BlogListItem;